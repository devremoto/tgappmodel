using Domain.Entities;

namespace Application.Interfaces;

public partial interface IContactAppService : IBaseAppService<Contact>
{
    Contact Save(Contact viewModel, bool edit = false);
}

