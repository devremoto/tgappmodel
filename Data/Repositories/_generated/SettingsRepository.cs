using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class SettingsRepository(AppDbContext db) : BaseRepository<Settings>(db), ISettingsRepository
{
}

