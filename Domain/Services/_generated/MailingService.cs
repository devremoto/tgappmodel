using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class MailingService : BaseService<Mailing>, IMailingService
    {
        IMailingRepository _repository;
        public MailingService(IMailingRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
