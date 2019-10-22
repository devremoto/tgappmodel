using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class SettingsRepository : BaseRepository<Settings>, ISettingsRepository
    {
        public SettingsRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

