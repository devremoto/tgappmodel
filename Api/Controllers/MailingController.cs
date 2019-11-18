using Api.Controllers.Hubs;
using Api.Models;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public partial class MailingController : BaseController<Guid, IMailingAppService, Mailing, MailingViewModel>
    {
        public MailingController(IMailingAppService service, IWebHostEnvironment hostingEnvironment, AppModelConfiguration configuration, IMapper mapper, INotificationHub notification)
		: base(hostingEnvironment, configuration, service, mapper, notification)
		{
            _service = service;
        }

        [HttpPost]
        [Route("SendEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> SendEmail([FromBody] MailingViewModel contactModel)
        {
            try
            {
                var entity = _mapper.Map<Mailing>(contactModel);
                await Task.Run(() => _service.SendEmail(entity));
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("SignUp")]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody] MailingViewModel contactModel)
        {
            try
            {
                var entity = _mapper.Map<Mailing>(contactModel);
                await Task.Run(() => _service.SignUp(entity));
                return Ok();
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception)
            {
                return BadRequest("Error while trying to signup to the mailing list");
            }
        }
    }
}

