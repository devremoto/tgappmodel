using CrossCutting.Extensions;
using CrossCutting.Helpers;
using CrossCutting.Services.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using System.Net.Mime;

namespace CrossCutting.Services.Mail;

public class EmailService(SmtpConfiguration configuration) : IEmailService
{
    readonly SmtpConfiguration _configuration = configuration;

    private SmtpClient MailClient
    {
        get
        {
            var client = new SmtpClient(_configuration.Server);
            if (_configuration.Port.HasValue)
            {
                client.Port = _configuration.Port.Value;
            }
            client.Credentials = new System.Net.NetworkCredential(_configuration.User, _configuration.Password);
            if (_configuration.EnableSsl.HasValue)
            {
                client.EnableSsl = _configuration.EnableSsl.Value;
            }
            return client;
        }
    }

    public void SendEmail(MailAddress sender, MailAddress receiver, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null)
    {
        using var mail = new MailMessage(sender, receiver);
        mail.ReplyToList.Add(sender);
        mail.Subject = subject;
        mail.Body = content;
        mail.IsBodyHtml = asHtml && (content?.Contains('<') ?? false);
        var streamsToDispose = new List<Stream>();
        if (attachments?.Count > 0)
        {
            foreach (var attachment in attachments)
            {
                ContentType type = FileHelper.GetMimeTypeFromFileName(attachment.Key);
                var stream = attachment.Value.ToStream();
                streamsToDispose.Add(stream);
                var file = new Attachment(stream, type)
                {
                    Name = attachment.Key
                };

                mail.Attachments.Add(file);
            }

        }
        MailClient.Send(mail);

        foreach (var stream in streamsToDispose)
        {
            stream.Dispose();
        }

    }

    public void SendEmail(string receiver, string subject, string content, bool asHtml = true)
    {
        SendEmail(new MailAddress(_configuration.MailAddress), new MailAddress(receiver), subject, content, asHtml);
    }

    public void SendEmail(string receiver, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null)
    {
        SendEmail(new MailAddress(_configuration.MailAddress), new MailAddress(receiver), subject, content, asHtml, attachments);
    }

    public void SendEmail(string sender, string receiver, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null)
    {
        SendEmail(new MailAddress(_configuration.MailAddress, sender), new MailAddress(receiver), subject, content, asHtml, attachments);
    }
    public void SendEmail(string receiver, string receiverName, string subject, string content, bool asHtml = true)
    {
        SendEmail(new MailAddress(_configuration.MailAddress), new MailAddress(receiver, receiver + " " + receiverName), subject, content, asHtml);
    }

    public void SendEmail(string sender, string senderName, string receiver, string receiverName, string subject, string content, bool asHtml = true)
    {
        SendEmail(new MailAddress(_configuration.MailAddress, sender + " " + senderName), new MailAddress(receiver, receiver + " " + receiverName), subject, content, asHtml);
    }

    public void SendEmail(string sender, string receiver, string receiverName, string subject, string content, bool asHtml = true)
    {
        SendEmail(new MailAddress(_configuration.MailAddress, sender + " " + receiverName), new MailAddress(receiver), subject, content, asHtml);
    }

    public void SendEmail(MailAddress receiver, string subject, string content, bool asHtml = true)
    {
        SendEmail(new MailAddress(_configuration.MailAddress), receiver, subject, content, asHtml);
    }

    public void SendEmail(MailMessage message)
    {
        MailClient.Send(message);
    }


}




