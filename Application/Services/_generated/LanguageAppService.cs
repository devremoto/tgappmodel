using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;

namespace Application.Services;

public partial class LanguageAppService : BaseAppService<Language>, ILanguageAppService
{
    readonly ILanguageService _service;
    public LanguageAppService(ILanguageService service, IUnitOfWork uow)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
    }

    public Language Save(Language model, bool edit = false)
    {
        _ = new Language();
        Language result;
        if (!edit || model.Id == default(Guid))
            result = _service.Add(model);
        else
            result = _service.Update(model);
        _uow.Commit();
        //SaveJson();
        return result;
    }
}