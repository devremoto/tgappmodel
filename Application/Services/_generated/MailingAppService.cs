using System;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
    public partial class MailingAppService : BaseAppService<Mailing>, IMailingAppService
    {
		IMailingService _service;
        public MailingAppService(IMailingService service, IUnitOfWork uow)
		: base(service, uow)
        {
			_uow = uow;
            _service = service;
        }

		public Mailing Save(Mailing model, bool edit = false)
        {
			var result = new Mailing();

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