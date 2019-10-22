using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class ContactRepository : BaseRepository<Contact>, IContactRepository
    {
        public ContactRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

