using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class AboutService(IAboutRepository repository) : BaseService<About>(repository), IAboutService
{
    readonly IAboutRepository _repository = repository;
}
