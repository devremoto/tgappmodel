using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class ContactRepository(AppDbContext db) : BaseRepository<Contact>(db), IContactRepository
{
}

