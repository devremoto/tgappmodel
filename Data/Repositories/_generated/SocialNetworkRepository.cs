using Data.EF;
using Domain.Entities;
using Domain.Interfaces;

namespace Data.Repositories;

public partial class SocialNetworkRepository(AppDbContext db) : BaseRepository<SocialNetwork>(db), ISocialNetworkRepository
{
}

