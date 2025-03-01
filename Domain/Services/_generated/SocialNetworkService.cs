using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class SocialNetworkService(ISocialNetworkRepository repository) : BaseService<SocialNetwork>(repository), ISocialNetworkService
{
    readonly ISocialNetworkRepository _repository = repository;
}
