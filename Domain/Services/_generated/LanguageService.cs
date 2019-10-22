using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class LanguageService : BaseService<Language>, ILanguageService
    {
        ILanguageRepository _repository;
        public LanguageService(ILanguageRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
