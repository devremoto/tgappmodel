using Application.ViewModels;
using Domain.Entities;
using System;

namespace Application.Interfaces
{
    public partial interface IMailingAppService : IBaseAppService<Mailing>
    {
		Mailing Save(Mailing viewModel, bool edit = false);
    }
}

