using Domain.Entities;

namespace Application.Interfaces;

public partial interface IAboutAppService : IBaseAppService<About>
{
    About Save(About viewModel, bool edit = false);
}

