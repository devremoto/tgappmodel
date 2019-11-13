using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public partial class SettingsController 

    {
        
		private readonly ISettingsAppService _service;




        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SettingsViewModel model)
        {
            try
            {
				var entity = _mapper.Map<Settings>(model);
				var result = await Task.FromResult(_service.Save(entity, false));
                return Created("",_mapper.Map<SettingsViewModel>(result));
            }
            catch(Exception e)
            {
                return BadRequest($"Error while saving Settings {e.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SettingsViewModel model)
        {
            try
            {
				var entity = _mapper.Map<Settings>(model);
				var result = await Task.FromResult(_service.Save(entity, true));
                return Ok(_mapper.Map<SettingsViewModel>(result));
            }
            catch(Exception e)
            {
                return BadRequest($"Error while saving Settings {e.Message}");
            }
        }

		protected override void Dispose(bool disposing)
		{
			_service.Dispose();
			base.Dispose(disposing);
		}

    }
}

