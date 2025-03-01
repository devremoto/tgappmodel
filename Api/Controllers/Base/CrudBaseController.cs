using Application.Interfaces;
using Application.ViewModels.Common;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Api.Controllers.Base;

public class CrudBaseController<T, TViewModel>(IBaseAppService<T> service, IMapper mapper, ILogger<T> logger) : ControllerBase where T : class
{
    protected IBaseAppService<T> _service = service;
    protected readonly IMapper _mapper = mapper;
    protected readonly ILogger<T> _logger = logger;

    [HttpGet]
    public virtual async Task<ActionResult> Get([FromQuery] PagingViewModel<TViewModel> page)
    {
        try
        {
            if (page.Size == 0 && page.Number == 0)
            {
                var result = _service.GetAll();
                return Ok(await Task.FromResult(result));
            }
            else
            {
                var result = _service.GetByAllPage(_mapper.Map<PagingViewModel<T>>(page));
                return Ok(await Task.FromResult(result));
            }
        }
        catch (ArgumentException ex)
        {
            return ServerError(ex.Message);
        }
    }

    [HttpGet]
    [Route("{id}")]
    public virtual async Task<ActionResult> Get([FromRoute] Guid id)
    {
        try
        {
            var result = _service.GetOne(id);
            if (result == null)
            {
                return NotFound(new { Message = $"{nameof(T)} {id} not found" });
            }
            return Ok(await Task.FromResult(result));
        }
        catch (ArgumentException)
        {
            return BadRequest();
        }
        catch (Exception ex)
        {
            return ServerError(ex.Message);
        }
    }

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
            return ServerError(ex.Message);
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
            return ServerError(ex.Message);
        }
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<ActionResult> Put([FromRoute] Guid id, [FromBody] TViewModel model)
    {
        try
        {
            var entity = _mapper.Map<T>(model);
            var result = _service.GetOne(id);
            if (result == null)
            {
                return NotFound(new { Message = $"{nameof(T)} {id} not found" });
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
            return ServerError(ex.Message);
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public virtual async Task<ActionResult> Delete([FromRoute] Guid id)
    {
        try
        {
            var result = _service.GetOne(id);
            if (result == null)
            {
                return NotFound(new { Message = $"{nameof(T)} {id} not found" });
            }
            await Task.Run(() => _service.Remove(result));
            return NoContent();
        }
        catch (ArgumentException)
        {
            return BadRequest(id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return ServerError("Internal error");
        }
    }
    protected ObjectResult ServerError(object error, ServerErrorCodes statusCode = ServerErrorCodes.Status500InternalServerError)
    {
        _logger.LogError(error.ToString());
        return StatusCode((int)statusCode, error);
    }

    protected ObjectResult ServerError(Exception ex, ServerErrorCodes statusCode = ServerErrorCodes.Status500InternalServerError)
    {
        _logger.LogError(ex, ex.Message);
        return StatusCode((int)statusCode, ex.Message);
    }
}

public enum ServerErrorCodes
{

    Status500InternalServerError = 500,
    Status501NotImplemented = 501,
    Status502BadGateway = 502,
    Status503ServiceUnavailable = 503,
    Status504GatewayTimeout = 504,
    Status505HttpVersionNotsupported = 505,
    Status506VariantAlsoNegotiates = 506,
    Status507InsufficientStorage = 507,
    Status508LoopDetected = 508,
    Status510NotExtended = 510,
    Status511NetworkAuthenticationRequired = 511,
}