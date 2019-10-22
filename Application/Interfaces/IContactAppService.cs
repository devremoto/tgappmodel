using Domain.Entities;

namespace Application.Interfaces
{
    public partial interface IContactAppService 
    {
        void SendEmail(Contact contactModel);
    }
}

