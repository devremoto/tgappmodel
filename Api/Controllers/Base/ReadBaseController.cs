using Application.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Api.Controllers;

public class ReadBaseController<T, TViewModel>(IBaseAppService<T> service, IMapper mapper, ILogger<T> logger) : ControllerBase where T : class
{
    protected IBaseAppService<T> _service = service;
    protected readonly IMapper _mapper = mapper;
    protected readonly ILogger<T> _logger = logger;

    [HttpGet]
    public async Task<ActionResult> Get()
    {
        try
        {
            var result = _service.GetAll();
            return Ok(await Task.FromResult(result));
        }
        catch (ArgumentException ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> Get([FromRoute] object id)
    {
        try
        {
            var result = _service.GetOne(id);
            if (result == null)
            {
                return NotFound(new { Message = $"{nameof(T)} {id?.ToString()} not found" });
            }
            return Ok(await Task.FromResult(result));
        }
        catch (ArgumentException)
        {
            return BadRequest();
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }
}