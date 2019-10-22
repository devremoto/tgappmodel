using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class SettingsService : BaseService<Settings>, ISettingsService
    {
        ISettingsRepository _repository;
        public SettingsService(ISettingsRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
