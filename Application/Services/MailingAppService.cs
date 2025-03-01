﻿using CrossCutting.Services.Mail;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System.Linq;

namespace Application.Services;

public partial class MailingAppService
{
    private readonly IEmailService _emailService;

    public MailingAppService(IMailingService service, IUnitOfWork uow, IEmailService emailService)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
        _emailService = emailService;
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
        mailing?.ValidateSendEmail();
        _emailService.SendEmail(mailing.Email, "mail@mail.com", "Cadastro adicionado ao Mailing", $"{mailing.Email}<br />Cadastro adicionado ao Mailing", null);
        //_service.SendEmail(contact);

    }
}
