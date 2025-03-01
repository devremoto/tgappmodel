using Domain.Entities;

namespace Application.Interfaces;

public partial interface ILanguageAppService : IBaseAppService<Language>
{
    Language Save(Language viewModel, bool edit = false);
}

