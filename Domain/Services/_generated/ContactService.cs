using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class ContactService(IContactRepository repository) : BaseService<Contact>(repository), IContactService
{
    readonly IContactRepository _repository = repository;
}
