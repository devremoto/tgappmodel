using Data.EF;
using Domain.Interfaces;
using System;

namespace Data.UoW;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private readonly AppDbContext _context = context;
    private bool _disposed;

    public void BeginTransaction()
    {
        _disposed = false;
    }

    public void Commit()
    {
        _context.SaveChanges();
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
        _disposed = true;
    }
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
