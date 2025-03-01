using System;
using System.Linq;
using System.Linq.Expressions;

namespace Domain.Interfaces;

public interface IBaseRepository<T> : IDisposable where T : class
{
    T Add(T entity);
    T GetOne(params object[] keys);
    IQueryable<T> GetAll(params string[] includeProperties);
    T Update(T entity);
    void Remove(params object[] keys);
    void Remove(T entity);
    IQueryable<T> Find(Expression<Func<T, bool>> predicate, params string[] includeProperties);
    int SaveChanges();
}