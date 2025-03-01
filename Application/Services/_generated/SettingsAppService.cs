using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;

namespace Application.Services;

public partial class SettingsAppService : BaseAppService<Settings>, ISettingsAppService
{
    readonly ISettingsService _service;
    public SettingsAppService(ISettingsService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public Settings Save(Settings model, bool edit = false)
    {
        _ = new Settings();
        Settings result;
        if (!edit || model.Id == default(Guid))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}