using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class MailingRepository(AppDbContext db) : BaseRepository<Mailing>(db), IMailingRepository
{
}

