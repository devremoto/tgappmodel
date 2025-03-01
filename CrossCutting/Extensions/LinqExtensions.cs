using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace CrossCutting.Extensions;

public static class LinqExtensions
{
    #region LINQ
    public static Tuple<IQueryable<T>, int> Paging<T, TKey>(this IQueryable<T> obj, int? page, int? pageSize = 50, string orderBy = null, string orderDirection = "ASC")
    {
        return Paging(obj, page, pageSize, orderBy, orderDirection);
    }

    public static Tuple<IQueryable<T>, int> Paging<T>(this IEnumerable<T> obj, int? page, int? pageSize = 50, string orderBy = null, string orderDirection = "ASC")
    {
        if (page != null && page.Value <= 0)
            page = 1;
        int size = (int)pageSize.Value;
        try
        {
            if (page == 1)
                if (orderBy != null)
                    return new Tuple<IQueryable<T>, int>(obj.AsQueryable().OrderBy($"{orderBy} {orderDirection}").Take(size).AsQueryable(), obj.Count());
                else
                    return new Tuple<IQueryable<T>, int>(obj.Take(size).AsQueryable(), obj.Count());
            else
            {
                if (orderBy != null)
                    return new Tuple<IQueryable<T>, int>(obj.AsQueryable().OrderBy($"{orderBy} {orderDirection}").Skip(((int)page - 1) * size).Take(size).AsQueryable(), obj.Count());
                else
                    return new Tuple<IQueryable<T>, int>(obj.Skip(((int)page - 1) * size).Take(size).AsQueryable(), obj.Count());
            }
        }
        catch (Exception)
        {
            throw;
        }
    }


    public static IQueryable<T> AddProperties<T>(this IQueryable<T> query, params string[] includeProperties) where T : class
    {
        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }
        return query;
    }
    //public IQueryable IncludeEnt<T,TProp>(this IQueryable<T> obj, Expression<Func<T,TProp>> include)
    //{
    //    obj.Include(include);
    //}
    #endregion
}
