using Domain.Entities;

namespace Application.Interfaces;

public partial interface IMailingAppService : IBaseAppService<Mailing>
{
    Mailing Save(Mailing viewModel, bool edit = false);
}

