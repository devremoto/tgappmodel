using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;

namespace Application.Services;

public partial class SocialNetworkAppService : BaseAppService<SocialNetwork>, ISocialNetworkAppService
{
    readonly ISocialNetworkService _service;
    public SocialNetworkAppService(ISocialNetworkService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public SocialNetwork Save(SocialNetwork model, bool edit = false)
    {
        _ = new SocialNetwork();
        SocialNetwork result;
        if (!edit || model.Id == default(Guid))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}