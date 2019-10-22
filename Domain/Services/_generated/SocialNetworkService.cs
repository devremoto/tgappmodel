using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class SocialNetworkService : BaseService<SocialNetwork>, ISocialNetworkService
    {
        ISocialNetworkRepository _repository;
        public SocialNetworkService(ISocialNetworkRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
