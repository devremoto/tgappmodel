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

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public partial class SettingsController : BaseController<Guid, ISettingsAppService, Settings, SettingsViewModel>
    {
        public SettingsController(ISettingsAppService service, IWebHostEnvironment hostingEnvironment, AppModelConfiguration configuration, IMapper mapper, INotificationHub notification)
		: base(hostingEnvironment, configuration, service, mapper, notification)
		{
            _service = service;
        }
    }
}

