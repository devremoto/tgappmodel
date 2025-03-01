using Api.Models;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public partial class SettingsController(ISettingsAppService service, IWebHostEnvironment hostEnvironment, AppModelConfiguration configuration, IMapper mapper) : BaseController<Guid, ISettingsAppService, Settings, SettingsViewModel>(hostEnvironment, configuration, service, mapper)
{
}

