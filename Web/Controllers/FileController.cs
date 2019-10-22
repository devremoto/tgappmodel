using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    [Route("[controller]")]
    public class FileController : BaseController
    {
        public FileController(IWebHostEnvironment hostingEnvironment, IOptions<AppSettings> settings)
            : base(hostingEnvironment, settings)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [Route("assets")]
        [HttpGet]
        public async Task<IActionResult> Assets([FromQuery]string folder = "")
        {
            if (folder.Contains(":") || folder.Contains("..") || folder.Contains("*"))
            {
                return BadRequest(new { Message = "Invalid request" });
            }
            folder = folder == "/" ? "" : folder;
            var path = Path.Combine("/assets/i18n", folder);
            var directories = Directory.GetDirectories(_hostingEnvironment.WebRootPath + path).ToList();
            var files = Directory.GetFiles(_hostingEnvironment.WebRootPath + path).ToList();
            directories.AddRange(files);
            var result = new List<AssetViewModel>();
            directories.ForEach(x =>
            {
                var assetPath = x.Replace(_hostingEnvironment.WebRootPath + path + "\\", "");
                result.Add(new AssetViewModel
                {
                    Path = assetPath,
                    IsDir = !assetPath.EndsWith(".json"),
                    Folder = folder == "" ? folder : $"{folder}/"
                }); ;

            });
            return Ok(await Task.FromResult(result));
        }

        [Route("saveasset")]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] List<AssetViewModel> list)
        {
            try
            {
                foreach (var view in list)
                {
                    var path = _hostingEnvironment.WebRootPath;
                    var filePath = Path.Combine(path, "assets/i18n", view.Folder, view.Path);
                    var file = $"{path}/assets/i18n/{view.Folder}/{view.Path}";
                    System.IO.File.WriteAllText(file, view.Content);
                }

                return Ok(await Task.FromResult(list));
            }
            catch (System.Exception)
            {
                return BadRequest("erro ao gravar o arquivo");
            }
        }
    }
}
