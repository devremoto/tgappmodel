using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class AboutRepository : BaseRepository<About>, IAboutRepository
    {
        public AboutRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

