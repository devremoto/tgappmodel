using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Helpers.Upload;

public interface IUploadHelper
{
    Task<UploadFormData<T>> Upload<T>(List<IFormFile> files, T entity = null) where T : class;
}