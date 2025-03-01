using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class MailingService(IMailingRepository repository) : BaseService<Mailing>(repository), IMailingService
{
    readonly IMailingRepository _repository = repository;
}
