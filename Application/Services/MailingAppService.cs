using CrossCutting.Services.Mail;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System.Linq;
using CrossCutting.Services.Configuration;

namespace Application.Services
{
    public partial class MailingAppService
    {
        private IEmailService _emailService;
        private SmtpConfiguration _config;

        public MailingAppService(IMailingService service, IUnitOfWork uow, IEmailService emailService, SmtpConfiguration config)
        : base(service, uow)
        {
            _uow = uow;
            _service = service;
            _emailService = emailService;
            _config = config;
        }

        public void SignUp(Mailing model)
        {
            model?.ValidateSignUp();

            model.Active = true;
            var mail = _service.Find(x => x.Email == model.Email).FirstOrDefault();
            if (mail == null)
            {
                _service.Add(model);
                //SendEmail(mailingModel);
                return;
            }
            else if (!mail.Active)
            {
                _service.Update(mail);
                //SendEmail(mailingModel);
                return;
            }
            throw new System.ApplicationException($"{mail.Email} is already in the Mailing List");
        }

        public void SendEmail(Mailing mailing)
        {
            try
            {
                mailing?.ValidateSendEmail();
                _emailService.SendEmail(mailing.Email, _config.MailAddress, "Cadastro adicionado ao Mailing", $"{mailing.Email}<br />Cadastro adicionado ao Mailing", null);
                //_service.SendEmail(contact);
            }
            catch (System.Exception e)
            {

                throw e;
            }
        }
    }

}
