using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;

namespace Application.Services;

public partial class MailingAppService : BaseAppService<Mailing>, IMailingAppService
{
    readonly IMailingService _service;
    public MailingAppService(IMailingService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public Mailing Save(Mailing model, bool edit = false)
    {
        _ = new Mailing();
        Mailing result;
        if (!edit || model.Id == default(Guid))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}