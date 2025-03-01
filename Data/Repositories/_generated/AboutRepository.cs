using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class AboutRepository(AppDbContext db) : BaseRepository<About>(db), IAboutRepository
{
}

