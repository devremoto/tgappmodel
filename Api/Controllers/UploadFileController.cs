using Api.Models;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
public partial class UploadFileController(IUploadFileAppService service, IWebHostEnvironment hostEnvironment, AppModelConfiguration configuration, IMapper mapper) : BaseController<string, IUploadFileAppService, UploadFile, UploadFileViewModel>(hostEnvironment, configuration, service, mapper)
{
}

