﻿using Api.Models;
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
    public partial class SocialNetworkController    
    {
        
		private readonly ISocialNetworkAppService _service;




        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SocialNetworkViewModel model)
        {
            try
            {
				var entity = _mapper.Map<SocialNetwork>(model);
				var result = await Task.FromResult(_service.Save(entity, false));
                return Created("",_mapper.Map<SocialNetworkViewModel>(result));
            }
            catch(Exception e)
            {
                return BadRequest($"Error while saving Social Network {e.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SocialNetworkViewModel model)
        {
            try
            {
				var entity = _mapper.Map<SocialNetwork>(model);
				var result = await Task.FromResult(_service.Save(entity, true));
                return Ok(_mapper.Map<SocialNetworkViewModel>(result));
            }
            catch(Exception e)
            {
                return BadRequest($"Error while saving Social Network {e.Message}");
            }
        }

		protected override void Dispose(bool disposing)
		{
			_service.Dispose();
			base.Dispose(disposing);
		}

    }
}

