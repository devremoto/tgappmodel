using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class LanguageRepository : BaseRepository<Language>, ILanguageRepository
    {
        public LanguageRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

