using Application.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Application.Interfaces;

public interface IBaseAppService<T>
    where T : class
{
    T Add(T model);
    IQueryable<T> Find(Expression<Func<T, bool>> predicate, params string[] includeProperties);
    IQueryable<T> GetAll(params string[] includeProperties);
    PagingViewModel<T> GetByAllPage(PagingViewModel<T> page, params string[] includeProperties);
    T GetOne(params object[] keys);
    void Remove(T model);
    void Remove(params object[] keys);
    T Update(T model);
    void Dispose();
    void SaveJson();
    List<T> GetJson(int hours = 24);
}