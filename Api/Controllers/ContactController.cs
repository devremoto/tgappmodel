using Api.Models;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public partial class ContactController(IContactAppService service, IWebHostEnvironment hostEnvironment, AppModelConfiguration configuration, IMapper mapper) : BaseController<Guid, IContactAppService, Contact, ContactViewModel>(hostEnvironment, configuration, service, mapper)
{
    [HttpPost]
    [Route("SendEmail")]
    [AllowAnonymous]
    public async Task<IActionResult> SendEmail([FromBody] ContactViewModel contactModel)
    {

        try
        {
            var entity = _mapper.Map<Contact>(contactModel);
            await Task.Run(() => _service.SendEmail(entity));
            return Ok();
        }
        catch (System.Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}

