using Api.Controllers.Hubs;
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

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public partial class ContactController : BaseController<Guid, IContactAppService, Contact, ContactViewModel>
    {
        public ContactController(IContactAppService service, IWebHostEnvironment hostingEnvironment, AppModelConfiguration configuration, IMapper mapper, INotificationHub notification)
		: base(hostingEnvironment, configuration, service, mapper, notification)
		{
            _service = service;
        }

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
}

