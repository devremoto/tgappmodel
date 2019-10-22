using CrossCutting.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Web.Helpers.Upload;
using Web.Helpers.File;
using Web.Helpers.Image;
using Web.Models;
using Web.ViewModels;

namespace Web.Controllers
{

    public class BaseController : Controller
    {
        protected string FilePath { get; set; }

        protected string WebRootPath { get; private set; }
        protected string ContentRootPath { get; private set; }

        protected readonly IOptions<AppSettings> _settings;
        protected IWebHostEnvironment _hostingEnvironment;
        private string _uploadFolder;

        public BaseController(IWebHostEnvironment hostingEnvironment, IOptions<AppSettings> settings)
        {
            _settings = settings;
            _uploadFolder = settings.Value.UploadFolder;
            _hostingEnvironment = hostingEnvironment;
            WebRootPath = _hostingEnvironment.WebRootPath;
            ContentRootPath = _hostingEnvironment.ContentRootPath;
            FilePath = FilePath ?? Path.Combine(ContentRootPath, _uploadFolder ?? "");
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("image/{name}")]
        public async Task<IActionResult> Image(string name, [FromQuery]double w = 0, [FromQuery]double h = 0, [FromQuery] bool base64 = false)
        {
            var path = GetImagePath(name);
            FileContentResult result;
            using (var file = System.IO.File.OpenRead(path))
            {
                if (w > 0 || h > 0)
                {
                    using (var r = ImageHelper.ScaleImage(path, w, h))
                    {

                        if (base64)
                        {
                            byte[] imageBytes = r.ToArray();
                            string base64String = Convert.ToBase64String(imageBytes);
                            return Ok($"data:{GetType(name)};base64,{base64String}");
                        }
                        result = File(r.ToArray(), GetType(name));
                    }

                }
                else
                {
                    using (var reader = new MemoryStream())
                    {
                        file.CopyTo(reader);
                        result = File(reader.ToArray(), GetType(name));
                    }
                }
            }

            return await Task.FromResult(result);

        }


        [HttpGet]
        [AllowAnonymous]
        [Route("file/{name}")]
        public async Task<IActionResult> GetFile(string name)
        {
            var path = GetImagePath(name);
            FileContentResult result;
            using (var file = System.IO.File.OpenRead(path))
            {

                using (var reader = new MemoryStream())
                {
                    file.CopyTo(reader);
                    result = File(reader.ToArray(), GetType(name));
                }
            }

            return await Task.FromResult(result);

        }

        private string GetType(string name)
        {
            return FileHelper.GetMimeType(new FileInfo(name).Extension);
        }

        [HttpPost]
        //[DisableFormValueModelBinding]
        //[ValidateAntiForgeryToken]
        [Route("upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                string fileName = string.Empty;
                var ListFileViewModel = new List<FileViewModel>();
                if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
                {
                    return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
                }

                // Used to accumulate all the form url encoded key value pairs in the
                // request.
                var formAccumulator = new KeyValueAccumulator();

                var boundary = MultipartRequestHelper.GetBoundary(
                    MediaTypeHeaderValue.Parse(Request.ContentType));
                var reader = new MultipartReader(boundary, HttpContext.Request.Body);

                var section = await reader.ReadNextSectionAsync();
                while (section != null)
                {
                    var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out ContentDispositionHeaderValue contentDisposition);

                    if (hasContentDispositionHeader)
                    {
                        if (MultipartRequestHelper.HasFileContentDisposition(contentDisposition))
                        {

                            var file = section.AsFileSection();
                            fileName = file.FileName;

                            ListFileViewModel.Add(new FileViewModel
                            {
                                FileName = file.FileName,
                                Size = file.Section.Body.Length,
                                Type = file.Section.ContentType
                            });
                            string dir = GetUploadDir();
                            Directory.CreateDirectory(dir);
                            var path = Path.Combine(dir, fileName); ;
                            using (var targetStream = System.IO.File.Create(path))
                            {
                                await section.Body.CopyToAsync(targetStream);

                            }

                            if (file.Section.ContentType.ToLower().Contains("image"))
                                ImageHelper.CorrectRotation(path);
                        }
                        else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                        {

                            var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                            var encoding = GetEncoding(section);
                            using (var streamReader = new StreamReader(
                                section.Body,
                                encoding,
                                detectEncodingFromByteOrderMarks: true,
                                bufferSize: 1024,
                                leaveOpen: true))
                            {
                                var value = await streamReader.ReadToEndAsync();
                                if (string.Equals(value, "undefined", StringComparison.OrdinalIgnoreCase))
                                {
                                    value = string.Empty;
                                }
                                formAccumulator.Append(key.Value, value);

                                if (formAccumulator.ValueCount > 70)
                                {
                                    throw new InvalidDataException($"Form key count limit 70 exceeded.");
                                }
                            }
                        }
                    }

                    section = await reader.ReadNextSectionAsync();
                }

                UploadViewModel model = new UploadViewModel { };
                StringValues values = new StringValues();
                var formValueProvider = new FormValueProvider(
                    BindingSource.Form,
                    new FormCollection(formAccumulator.GetResults()),
                    CultureInfo.CurrentCulture);

                formAccumulator.GetResults().TryGetValue("model", out values);
                if (values.Count > 0)
                {
                    model = values.ToString().JsonDeserialize<UploadViewModel>();
                }

                var bindingSuccessful = await TryUpdateModelAsync(model, prefix: "",
                    valueProvider: formValueProvider);
                if (!bindingSuccessful)
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }
                }
                int i = 0;
                foreach (var file in model.Files)
                {
                    ListFileViewModel[i].InputFileField = file.InputFileField;
                    ListFileViewModel[i].Index = i;
                }
                return Json(new UploadViewModel { Entity = model.Entity, Files = ListFileViewModel });
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        private string GetUploadDir()
        {
            _uploadFolder = _uploadFolder ?? this.ControllerContext.RouteData.Values["controller"].ToString();
            var dir = Path.Combine(FilePath, _uploadFolder);
            return dir;
        }

        private string GetImagePath(string name)
        {
            return $"{ GetUploadDir() }/{ name}";
        }

        private static Encoding GetEncoding(MultipartSection section)
        {
            var hasMediaTypeHeader = MediaTypeHeaderValue.TryParse(section.ContentType, out MediaTypeHeaderValue mediaType);

            if (!hasMediaTypeHeader || Encoding.UTF7.Equals(mediaType.Encoding))
            {
                return Encoding.UTF8;
            }
            return mediaType.Encoding;
        }
    }


}
