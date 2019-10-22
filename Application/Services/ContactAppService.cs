using CrossCutting.Services.Mail;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Application.Services
{
	public partial class ContactAppService
    {

        private readonly IEmailService _emailService;

        public ContactAppService(IContactService service, IUnitOfWork uow, IEmailService emailService)
        : base(service, uow)
        {
            _uow = uow;
            _service = service;
            _emailService = emailService;
        }


        public void SendEmail(Contact contact)
        {
            try
            {
                _emailService.SendEmail(contact.Email, contact.Subject, $"{contact.Name}<br />{contact.Message}", true);
            }
            catch (System.Exception e)
            {

                throw e;
            }
        }
    }

}
