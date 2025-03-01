using CrossCutting.Extensions;
using CrossCutting.Services.Zip;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers;

[Route("api/[controller]")]
public class ZipCodeController(IZipCode code) : Controller
{
    private readonly IZipCode _code = code;

    [Route("{code}")]
    [HttpGet]
    public async Task<IActionResult> Get(string code)
    {
        var value = await Task.FromResult(_code.Json(code).ToJObject());
        return Ok(value);
    }
}
