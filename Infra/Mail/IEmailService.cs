using System.Collections.Generic;
using System.Net.Mail;

namespace CrossCutting.Services.Mail;

public interface IEmailService
{
    void SendEmail(MailAddress sender, MailAddress receiver, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
    void SendEmail(MailAddress receiver, string subject, string content, bool asHtml = true);
    void SendEmail(string receiver, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
    void SendEmail(string sender, string receiver, string subject, string content, bool asHtml = true, Dictionary<string, byte[]> attachments = null);
    void SendEmail(MailMessage message);
    void SendEmail(string receiver, string subject, string content, bool asHtml = true);
    void SendEmail(string receiver, string receiverName, string subject, string content, bool asHtml = true);
    void SendEmail(string sender, string receiver, string receiverName, string subject, string content, bool asHtml = true);
    void SendEmail(string sender, string senderName, string receiver, string receiverName, string subject, string content, bool asHtml = true);
}