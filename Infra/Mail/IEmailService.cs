using System.Collections.Generic;
using System.Net.Mail;

namespace CrossCutting.Services.Mail
{
    public interface IEmailService
    {
        void SendEmail(MailAddress sender, MailAddress destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
        void SendEmail(MailAddress destinatary, string subject, string content, bool asHtml = true);
        void SendEmail(string destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
        void SendEmail(string sender, string destinatary, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
        void SendEmail(MailMessage message);
        void SendEmail(string destinatary, string subject, string content, bool asHtml = true);
        void SendEmail(string destinatary, string destinataryName, string subject, string content, bool asHtml = true);
        void SendEmail(string sender, string destinatary, string destinataryName, string subject, string content, bool asHtml = true);
        void SendEmail(string sender, string senderName, string destinatary, string destinataryName, string subject, string content, bool asHtml = true);
    }
}