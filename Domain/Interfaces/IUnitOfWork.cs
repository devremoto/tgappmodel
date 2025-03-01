namespace Domain.Interfaces;

public interface IUnitOfWork
{
    void Commit();
    void Dispose();
}
