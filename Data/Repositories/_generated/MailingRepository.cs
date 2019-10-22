using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class MailingRepository : BaseRepository<Mailing>, IMailingRepository
    {
        public MailingRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

