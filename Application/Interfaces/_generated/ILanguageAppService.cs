using Application.ViewModels;
using Domain.Entities;
using System;

namespace Application.Interfaces
{
    public partial interface ILanguageAppService : IBaseAppService<Language>
    {
		Language Save(Language viewModel, bool edit = false);
    }
}

