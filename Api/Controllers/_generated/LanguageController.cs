using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers;

public partial class LanguageController
{

    private readonly ILanguageAppService _service = service;




    [HttpPost]
    public async Task<IActionResult> Create([FromBody] LanguageViewModel model)
    {
        try
        {
            var entity = _mapper.Map<Language>(model);
            var result = await Task.FromResult(_service.Save(entity, false));
            return Created("", _mapper.Map<LanguageViewModel>(result));
        }
        catch (Exception e)
        {
            return BadRequest($"Error while saving Language {e.Message}");
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] LanguageViewModel model)
    {
        try
        {
            var entity = _mapper.Map<Language>(model);
            var result = await Task.FromResult(_service.Save(entity, true));
            return Ok(_mapper.Map<LanguageViewModel>(result));
        }
        catch (Exception e)
        {
            return BadRequest($"Error while saving Language {e.Message}");
        }
    }

    protected override void Dispose(bool disposing)
    {
        _service.Dispose();
        base.Dispose(disposing);
    }

}

