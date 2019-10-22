using Domain.Entities;
using Domain.Interfaces;
using Domain.Services.Interfaces;

namespace Domain.Services
{
    public partial class UploadFileService : BaseService<UploadFile>, IUploadFileService
    {
        IUploadFileRepository _repository;
        public UploadFileService(IUploadFileRepository repository)
            : base(repository)
        {
            _repository = repository;
        }

    }
}
