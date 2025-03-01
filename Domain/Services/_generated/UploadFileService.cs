using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services;

public partial class UploadFileService(IUploadFileRepository repository) : BaseService<UploadFile>(repository), IUploadFileService
{
    readonly IUploadFileRepository _repository = repository;
}
