using Application.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Api.Controllers.Base;

public class CommandBaseController<T, TViewModel>(IBaseAppService<T> service, IMapper mapper, ILogger<T> logger) : ControllerBase where T : class
{
    protected IBaseAppService<T> _service = service;
    protected readonly IMapper _mapper = mapper;
    protected readonly ILogger<T> _logger = logger;

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] TViewModel model)
    {
        try
        {
            var entity = _mapper.Map<T>(model);
            var result = _service.Add(entity);
            return Ok(await Task.FromResult(result));
        }
        catch (ArgumentException)
        {
            return BadRequest(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return StatusCode((int)HttpStatusCode.InternalServerError, "Internal error");
        }
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromBody] TViewModel model)
    {
        try
        {
            var entity = _mapper.Map<T>(model);
            var result = await Task.FromResult(_service.Update(entity));
            return Ok(result);
        }
        catch (ArgumentException)
        {
            return BadRequest(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return StatusCode((int)HttpStatusCode.InternalServerError, "Internal error");
        }
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<ActionResult> Put([FromRoute] object id, [FromBody] TViewModel model)
    {
        try
        {
            var entity = _mapper.Map<T>(model);
            var result = _service.GetOne(id);
            if (result == null)
            {
                return NotFound(new { Message = $"{nameof(T)} {id?.ToString()} not found" });
            }
            result = await Task.FromResult(_service.Update(entity));
            return Ok(result);
        }
        catch (ArgumentException)
        {
            return BadRequest(model);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return StatusCode((int)HttpStatusCode.InternalServerError, "Internal error");
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> Delete(object[] id)
    {
        try
        {
            var result = _service.GetOne(id);
            if (result == null)
            {
                return NotFound(new { Message = $"{nameof(T)} {id?.ToString()} not found" });
            }
            await Task.Run(() => _service.Remove(result));
            return Ok();
        }
        catch (ArgumentException)
        {
            return BadRequest(id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return StatusCode((int)HttpStatusCode.InternalServerError, "Internal error");
        }
    }
}