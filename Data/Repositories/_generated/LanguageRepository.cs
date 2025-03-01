using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class LanguageRepository(AppDbContext db) : BaseRepository<Language>(db), ILanguageRepository
{
}

