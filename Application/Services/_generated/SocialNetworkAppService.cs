using System;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
    public partial class SocialNetworkAppService : BaseAppService<SocialNetwork>, ISocialNetworkAppService
    {
		ISocialNetworkService _service;
        public SocialNetworkAppService(ISocialNetworkService service, IUnitOfWork uow)
		: base(service, uow)
        {
			_uow = uow;
            _service = service;
        }

		public SocialNetwork Save(SocialNetwork model, bool edit = false)
        {
			var result = new SocialNetwork();

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