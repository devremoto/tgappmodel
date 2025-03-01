using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Domain.Services;

public class BaseService<T>(IBaseRepository<T> baseRepository) : IBaseService<T> where T : class
{
    protected IBaseRepository<T> _baseRepository = baseRepository;

    public T Add(T entity)
    {
        return _baseRepository.Add(entity);
    }

    public void Dispose()
    {
        _baseRepository.Dispose();
    }

    public IQueryable<T> Find(Expression<Func<T, bool>> predicate, params string[] includeProperties)
    {
        return _baseRepository.Find(predicate, includeProperties);
    }

    public IQueryable<T> GetAll(params string[] includeProperties)
    {
        return _baseRepository.GetAll(includeProperties);
    }

    public T GetOne(params object[] keys)
    {
        return _baseRepository.GetOne(keys);
    }

    public void Remove(params object[] keys)
    {
        _baseRepository.Remove(keys);
    }

    public void Remove(T entity)
    {
        _baseRepository.Remove(entity);
    }

    public int SaveChanges()
    {
        return _baseRepository.SaveChanges();
    }

    public T Update(T entity)
    {
        return _baseRepository.Update(entity);
    }
}
