using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;

namespace Application.Services;

public partial class ContactAppService : BaseAppService<Contact>, IContactAppService
{
    readonly IContactService _service;
    public ContactAppService(IContactService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public Contact Save(Contact model, bool edit = false)
    {
        _ = new Contact();
        Contact result;
        if (!edit || model.Id == default(Guid))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}