using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class LanguageService(ILanguageRepository repository) : BaseService<Language>(repository), ILanguageService
{
    readonly ILanguageRepository _repository = repository;
}
