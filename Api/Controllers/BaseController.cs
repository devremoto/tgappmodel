using Api.Helpers.Image;
using Api.Helpers.Upload;
using Api.Models;
using Application.Interfaces;
using Application.ViewModels.Common;
using AutoMapper;
using CrossCutting.Extensions;
using CrossCutting.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;//
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers;


public class BaseController<TKey, TService, T, TViewModel> : Controller
    where T : class
    where TViewModel : class
    where TService : IBaseAppService<T>
{
    protected string FilePath { get; set; }

    protected string modelName;
    protected string apiUrl;

    protected string WebRootPath { get; private set; }
    protected string ContentRootPath { get; private set; }

    private readonly IBaseAppService<T> _service;
    protected readonly IMapper _mapper;
    private readonly IWebHostEnvironment _hostEnvironment;
    protected AppModelConfiguration _settings;
    private readonly string _imgFolder;
    private static readonly string[] separator = ["name="];
    private static readonly string[] separatorArray = ["base64,"];

    public BaseController(IWebHostEnvironment hostEnvironment, AppModelConfiguration settings, IBaseAppService<T> service, IMapper mapper)
    {
        _imgFolder = settings.ImgFolder;
        _hostEnvironment = hostEnvironment;
        _settings = settings;
        WebRootPath = _hostEnvironment.WebRootPath;
        ContentRootPath = _hostEnvironment.ContentRootPath;
        _service = service;
        _mapper = mapper;
        FilePath ??= $@"{ContentRootPath}{_imgFolder}";
        modelName = typeof(T).Name;

    }

    [Route("{id}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetOne(TKey id)
    {
        try
        {
            var model = await Task.FromResult(_service.GetOne(id));
            if (model != null)
                return NotFound();
            return Ok(model);
        }
        catch (Exception e)
        {
            return BadRequest($"Error while retrieving {modelName} {e.Message}");
        }
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var model = await Task.FromResult(_service.GetAll());
            return Ok(model);
        }
        catch (Exception e)
        {
            return BadRequest($"Error while retrieving {modelName} {e.Message}");
        }
    }

    [Route("getAllPage")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> GetByAllPage([FromBody] PagingViewModel<TViewModel> page)
    {
        try
        {
            var entity = _mapper.Map<PagingViewModel<T>>(page);
            var model = await Task.FromResult(_service.GetByAllPage(entity));
            return Ok(model);
        }
        catch (Exception e)
        {
            return BadRequest($"Error while retrieving {modelName} {e.Message}");
        }
    }


    [HttpDelete]
    public async Task<IActionResult> Remove([FromBody] TViewModel model)
    {
        try
        {
            var entity = _mapper.Map<T>(model);
            await Task.Run(() => _service.Remove(entity));
            return Ok();
        }
        catch
        {
            return BadRequest($"Error while deleting {modelName}");
        }
    }

    [Route("{id}")]
    [HttpDelete]
    public async Task<IActionResult> Remove(TKey id)
    {
        try
        {
            await Task.Run(() => _service.Remove(id));
            return Ok();
        }
        catch
        {
            return BadRequest($"Error while deleting {modelName}");
        }
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("image/{name}")]
    public async Task<IActionResult> Image(string name, [FromQuery] double w = 0, [FromQuery] double h = 0, [FromQuery] bool base64 = false)
    {

        FileContentResult result;
        try
        {
            var bytes = ImageBytes(name, w, h);
            if (base64)
            {
                return Ok(ImageHelper.GetImageBase64(bytes, GetType(name)));
            }
            result = File(bytes, GetType(name));

            return await Task.FromResult(result);
        }
        catch (Exception e)
        {

            return (BadRequest(e));
        }

    }

    protected string Image64(string name, double w = 0, double h = 0)
    {
        var bytes = ImageBytes(name, w, h);
        return ImageHelper.GetImageBase64(bytes, GetType(name));
    }

    protected byte[] ImageBytes(string name, double w = 0, double h = 0)
    {
        var path = GetImagePath(name);
        return ImageHelper.GetImage(path, w, h);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("file/remove/{name}")]
    public async Task<IActionResult> RemoveFile(string name)
    {
        var path = GetImagePath(name);
        try
        {
            FileHelper.Remove(path);

            return await Task.FromResult(Ok());
        }
        catch (Exception e)
        {

            return (BadRequest(e));
        }

    }

    protected string GetType(string name)
    {
        return FileHelper.GetMimeType(new FileInfo(name).Extension);
    }

    protected string GetExtensionFromType(string mime)
    {
        return FileHelper.GetExtension(mime);
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

            using var reader = new MemoryStream();
            file.CopyTo(reader);
            result = File(reader.ToArray(), GetType(name));
        }

        return await Task.FromResult(result);

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
                        fileName = file?.FileName ?? "temp";

                        ListFileViewModel.Add(new FileViewModel
                        {
                            FileName = file?.FileName ?? "temp",
                            Size = file.Section.Body.Length,
                            Type = file.Section.ContentType
                        });
                        string dir = GetImageDir();
                        Directory.CreateDirectory(dir);
                        var path = $@"{dir}\{fileName}";
                        using (var targetStream = System.IO.File.Create(path))
                        {
                            await section.Body.CopyToAsync(targetStream);

                        }

                        if (file.Section.ContentType.Contains("image", StringComparison.CurrentCultureIgnoreCase))
                            ImageHelper.CorrectRotation(path);
                    }
                    else if (MultipartRequestHelper.HasFormDataContentDisposition(contentDisposition))
                    {
                        // Content-Disposition: form-data; name="key"
                        //
                        // value

                        // Do not limit the key name length here because the 
                        // multipart headers length limit is already in effect.
                        var key = HeaderUtilities.RemoveQuotes(contentDisposition.Name);
                        var encoding = GetEncoding(section);
                        using var streamReader = new StreamReader(
                            section.Body,
                            encoding,
                            detectEncodingFromByteOrderMarks: true,
                            bufferSize: 1024,
                            leaveOpen: true);
                        // The value length limit is enforced by MultipartBodyLengthLimit
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





                        if (value.Contains("base64"))

                        {

                            var file = section.AsFileSection();
                            fileName = section.ContentDisposition?.Split(separator, StringSplitOptions.RemoveEmptyEntries)[1]?.Replace("\"", "") ?? "temp";
                            string dir = GetImageDir();
                            Directory.CreateDirectory(dir);
                            var path = $@"{dir}\{fileName}";


                            var fileInfo = value.Split(separatorArray, StringSplitOptions.None);
                            var fileType = fileInfo[0].Replace("data:", "").Replace(";", "");
                            var extension = GetExtensionFromType(fileType);
                            var bytes = Convert.FromBase64String(fileInfo[1]);
                            System.IO.File.WriteAllBytes(path, bytes);

                            ListFileViewModel.Add(new FileViewModel
                            {
                                FileName = fileName,
                                Size = bytes.Length,
                                Type = fileType
                            });
                        }
                    }
                }

                // Drains any remaining section body that has not been consumed and
                // reads the headers for the next section.
                section = await reader.ReadNextSectionAsync();
            }
            // Bind form data to a model
            var model = new UploadViewModel { };
            var values = new StringValues();
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
            if (model.Files != null)
            {
                foreach (var file in model.Files)
                {
                    ListFileViewModel[i].InputFileField = file.InputFileField;
                    ListFileViewModel[i].Index = i;
                }
                return Json(new UploadViewModel { Entity = model.Entity, Files = ListFileViewModel });
            }
            return Ok();
        }
        catch (Exception e)
        {

            return BadRequest(e.Message);
        }
    }

    private string GetImageDir()
    {
        var controllerName = ControllerContext.RouteData.Values["controller"].ToString();
        var dir = $"{FilePath}\\{controllerName}";
        return dir;
    }

    private string GetImagePath(string name)
    {
        return $"{GetImageDir()}/{name}";
    }

    private static Encoding GetEncoding(MultipartSection section)
    {
        var hasMediaTypeHeader = MediaTypeHeaderValue.TryParse(section.ContentType, out MediaTypeHeaderValue mediaType);
        // UTF-7 is insecure and should not be honored. UTF-8 will succeed in 
        // most cases.
        if (!hasMediaTypeHeader)// || Encoding.UTF7.Equals(mediaType.Encoding))
        {
            return Encoding.UTF8;
        }
        return mediaType.Encoding;
    }

    [Route("saveJson")]
    [HttpGet]
    public async Task<IActionResult> SaveJson()
    {
        try
        {
            await Task.Run(() => _service.SaveJson());
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest($"Error while retrieving {modelName} {e.Message}");
        }
    }

    [Route("getJson")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetJson()
    {
        try
        {
            var model = await Task.FromResult(_service.GetJson());
            return Ok(model);
        }
        catch (Exception e)
        {
            return BadRequest($"Error while retrieving {modelName} {e.Message}");
        }
    }
}