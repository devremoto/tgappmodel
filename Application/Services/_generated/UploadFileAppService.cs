using System;
using Application.Interfaces;
using Application.ViewModels;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
    public partial class UploadFileAppService : BaseAppService<UploadFile>, IUploadFileAppService
    {
		IUploadFileService _service;
        public UploadFileAppService(IUploadFileService service, IUnitOfWork uow)
		: base(service, uow)
        {
			_uow = uow;
            _service = service;
        }

		public UploadFile Save(UploadFile model, bool edit = false)
        {
			var result = new UploadFile();

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