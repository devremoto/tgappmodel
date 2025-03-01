namespace CrossCutting.Services.Configuration;

public class SmtpConfiguration
{
    public string Server { get; set; }
    public int? Port { get; set; }
    public string User { get; set; }
    public string Password { get; set; }
    public bool? EnableSsl { get; set; }
    public string MailAddress { get; set; }
    public string DisplayName { get; set; }
}
