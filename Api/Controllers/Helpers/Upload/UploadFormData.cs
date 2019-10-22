using System.Collections.Generic;

namespace Api.Helpers.Upload
{
    public class UploadFormData<T> where T:class
    {
        public T Entity { get; set; }
        public List<UploadFile> Files { get; set; }
    }
}