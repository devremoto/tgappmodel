using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services;

public partial class UploadFileAppService : BaseAppService<UploadFile>, IUploadFileAppService
{
    readonly IUploadFileService _service;
    public UploadFileAppService(IUploadFileService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public UploadFile Save(UploadFile model, bool edit = false)
    {
        _ = new UploadFile();
        UploadFile result;
        if (!edit || model.Id == default(string))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}