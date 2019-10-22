using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers.Upload
{
    public class UploadHelper : IUploadHelper
    {

        public async Task<UploadFormData<T>> Upload<T>(List<IFormFile> files, T entity = null) where T : class
        {
            var fileList = new List<UploadFile>();
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();            

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
                fileList.Add(new UploadFile
                {
                    Name = formFile.Name,
                    Size = formFile.Length,
                    FileName = formFile.FileName,

                });
            }
            
            return await Task.FromResult(new UploadFormData<T>{ Entity = default(T), Files = fileList });
        }


    }
}