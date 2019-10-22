using Application.ViewModels;
using Domain.Entities;
using System;

namespace Application.Interfaces
{
    public partial interface IUploadFileAppService : IBaseAppService<UploadFile>
    {
		UploadFile Save(UploadFile viewModel, bool edit = false);
    }
}

