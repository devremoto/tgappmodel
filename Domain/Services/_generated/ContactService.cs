using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class ContactService : BaseService<Contact>, IContactService
    {
        IContactRepository _repository;
        public ContactService(IContactRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
