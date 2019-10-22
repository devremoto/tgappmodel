using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class AboutService : BaseService<About>, IAboutService
    {
        IAboutRepository _repository;
        public AboutService(IAboutRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
