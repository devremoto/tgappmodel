using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class UploadFileRepository(AppDbContext db) : BaseRepository<UploadFile>(db), IUploadFileRepository
{
}

