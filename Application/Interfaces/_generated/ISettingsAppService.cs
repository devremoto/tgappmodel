using Domain.Entities;

namespace Application.Interfaces;

public partial interface ISettingsAppService : IBaseAppService<Settings>
{
    Settings Save(Settings viewModel, bool edit = false);
}

