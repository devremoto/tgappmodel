using System;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
    public partial class ContactAppService : BaseAppService<Contact>, IContactAppService
    {
		IContactService _service;
        public ContactAppService(IContactService service, IUnitOfWork uow)
		: base(service, uow)
        {
			_uow = uow;
            _service = service;
        }

		public Contact Save(Contact model, bool edit = false)
        {
			var result = new Contact();

			if (!edit || model.Id == default(Guid))
				result = _service.Add(model);
			else
				result = _service.Update(model);			
			_uow.Commit();
			//SaveJson();
            return result;
        }
	}        
}