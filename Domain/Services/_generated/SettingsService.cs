using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class SettingsService(ISettingsRepository repository) : BaseService<Settings>(repository), ISettingsService
{
    readonly ISettingsRepository _repository = repository;
}
