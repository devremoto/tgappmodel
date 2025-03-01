using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;

namespace Application.Services;

public partial class AboutAppService : BaseAppService<About>, IAboutAppService
{
    readonly IAboutService _service;
    public AboutAppService(IAboutService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public About Save(About model, bool edit = false)
    {
        _ = new About();
        About result;
        if (!edit || model.Id == default(Guid))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}