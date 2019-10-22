using Api.Models;
using Application.AutoMapper;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using CrossCutting.Extensions;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public partial class UploadFileController    
    {
        
		private readonly IUploadFileAppService _service;




        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UploadFileViewModel model)
        {
            try
            {
				var entity = _mapper.Map<UploadFile>(model);
				var result = await Task.FromResult(_service.Save(entity, false));
                return Created("",_mapper.Map<UploadFileViewModel>(result));
            }
            catch(Exception e)
            {
                return BadRequest($"Error while saving Upload File {e.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UploadFileViewModel model)
        {
            try
            {
				var entity = _mapper.Map<UploadFile>(model);
				var result = await Task.FromResult(_service.Save(entity, true));
                return Ok(_mapper.Map<UploadFileViewModel>(result));
            }
            catch(Exception e)
            {
                return BadRequest($"Error while saving Upload File {e.Message}");
            }
        }

		protected override void Dispose(bool disposing)
		{
			_service.Dispose();
			base.Dispose(disposing);
		}

    }
}

