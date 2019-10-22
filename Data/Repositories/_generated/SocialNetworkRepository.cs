using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class SocialNetworkRepository : BaseRepository<SocialNetwork>, ISocialNetworkRepository
    {
        public SocialNetworkRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

