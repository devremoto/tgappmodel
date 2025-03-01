using Domain.Interfaces;

namespace Domain.Services.Interfaces;

public interface IBaseService<T> : IBaseRepository<T> where T : class
{

}
