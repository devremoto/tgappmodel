using System.Collections.Generic;

namespace Web.ViewModels
{
    public class UploadViewModel
    {
        public dynamic Entity { get; set; }
        public List<FileViewModel> Files { get; set; }
    }
}
