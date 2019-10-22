using Domain.Entities;

namespace Application.Interfaces
{
    public partial interface IMailingAppService 
    {
        void SendEmail(Mailing mailingModel);
        void SignUp(Mailing mailingModel);
    }
}

