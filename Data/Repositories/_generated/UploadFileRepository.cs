using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories
{
    public partial class UploadFileRepository : BaseRepository<UploadFile>, IUploadFileRepository
    {
        public UploadFileRepository(AppDbContext db)
            : base(db)
        {
            
        }		
    }
}

