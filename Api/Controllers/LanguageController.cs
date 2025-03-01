using Api.Models;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public partial class LanguageController(ILanguageAppService service, IWebHostEnvironment hostEnvironment, AppModelConfiguration configuration, IMapper mapper) : BaseController<Guid, ILanguageAppService, Language, LanguageViewModel>(hostEnvironment, configuration, service, mapper)
{
    [Route("translation")]
    [Route("translation/{text}/{from}/{to}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> TranslateAsync(string text, string from, string to)
    {
        var result = await _service.TranslateAsync(text, from, to);
        return Ok(new { text = result });
    }

    [Route("default")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> Default(string text, string from, string to)
    {
        var result = _service.Find(x => x.Default).FirstOrDefault();

        return Ok(await Task.FromResult(result));
    }
}

