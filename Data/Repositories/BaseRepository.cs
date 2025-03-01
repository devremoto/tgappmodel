﻿using Data.EF;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected AppDbContext Db;
    protected DbSet<T> DbSet;

    public BaseRepository(AppDbContext context)
    {
        context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        Db = context;
        DbSet = Db.Set<T>();
    }

    public virtual T Add(T obj)
    {
        DbSet.Add(obj);
        return obj;
    }

    public T GetOne(object[] keys)
    {
        return DbSet.Find(keys);
    }

    public virtual IQueryable<T> GetAll(params string[] includeProperties)
    {

        var query = DbSet.AsQueryable();
        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }
        return query;
    }

    public virtual T Update(T obj)
    {
        DbSet.Update(obj);
        return obj;
    }

    public virtual void Remove(params object[] keys)
    {
        DbSet.Remove(DbSet.Find(keys));
    }

    public virtual void Remove(T entity)
    {
        DbSet.Remove(entity);
    }

    public IQueryable<T> Find(Expression<Func<T, bool>> predicate, params string[] includeProperties)
    {
        var query = DbSet.Where(predicate);
        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }
        return query;
    }

    public int SaveChanges()
    {
        return Db.SaveChanges();
    }

    public void Dispose()
    {
        Db.Dispose();
        GC.SuppressFinalize(this);
    }
}