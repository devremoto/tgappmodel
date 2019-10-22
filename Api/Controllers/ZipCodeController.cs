using CrossCutting.Services.Zip;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CrossCutting.Extensions;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class ZipCodeController : Controller
    {
        private readonly IZipCode _code;

        public ZipCodeController(IZipCode code)
        {
            _code = code;
        }
        [Route("{code}")]
        [HttpGet]
        public async Task<IActionResult> Get(string code)
        {
            var value = await Task.FromResult(_code.Json(code).ToJObject());
            return Ok(value);
        }
    }
}
