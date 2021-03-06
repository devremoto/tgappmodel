﻿using System;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
    public partial class SettingsAppService : BaseAppService<Settings>, ISettingsAppService
    {
		ISettingsService _service;
        public SettingsAppService(ISettingsService service, IUnitOfWork uow)
		: base(service, uow)
        {
			_uow = uow;
            _service = service;
        }

		public Settings Save(Settings model, bool edit = false)
        {
			var result = new Settings();

			if (!edit || model.Id == default)
				result = _service.Add(model);
			else
				result = _service.Update(model);			
			_uow.Commit();
			//SaveJson();
            return result;
        }
	}        
}