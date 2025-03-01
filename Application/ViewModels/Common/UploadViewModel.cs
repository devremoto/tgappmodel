using System.Collections.Generic;

namespace Application.ViewModels.Common;

public class UploadViewModel
{
    public dynamic Entity { get; set; }
    public List<FileViewModel> Files { get; set; }
}
