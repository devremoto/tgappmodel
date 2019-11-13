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
    public partial class UploadFileController : BaseController<Guid, IUploadFileAppService, UploadFile, UploadFileViewModel>
    {
        public UploadFileController(IUploadFileAppService service, IWebHostEnvironment hostingEnvironment, AppModelConfiguration configuration, IMapper mapper)
        : base(hostingEnvironment, configuration, service, mapper)
        {
            _service = service;
        }
    }
}

