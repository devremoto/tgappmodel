using Application.ViewModels;
using Domain.Entities;
using System;

namespace Application.Interfaces
{
    public partial interface IContactAppService : IBaseAppService<Contact>
    {
		Contact Save(Contact viewModel, bool edit = false);
    }
}

