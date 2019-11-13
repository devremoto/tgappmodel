using System;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
    public partial class AboutAppService : BaseAppService<About>, IAboutAppService
    {
		IAboutService _service;
        public AboutAppService(IAboutService service, IUnitOfWork uow)
		: base(service, uow)
        {
			_uow = uow;
            _service = service;
        }

		public About Save(About model, bool edit = false)
        {
			var result = new About();

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