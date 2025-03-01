using Domain.Entities;

namespace Domain.Interfaces;

public interface IWorkContext
{
    public ApplicationUser User { get; }
}
