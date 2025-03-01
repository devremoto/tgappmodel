using Domain.Entities;

namespace Application.Interfaces;

public partial interface IUploadFileAppService : IBaseAppService<UploadFile>
{
    UploadFile Save(UploadFile viewModel, bool edit = false);
}

