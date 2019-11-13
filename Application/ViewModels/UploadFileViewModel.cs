using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels
{
    public partial class UploadFileViewModel
    {
		[Key]
		public Guid Id{ get; set; }
		public string Name{ get; set; }
		public string InputFileField{ get; set; }
		public long Size{ get; set; }
		public string Type{ get; set; }
		public string FileName{ get; set; }
		public string Controller{ get; set; }
		public string Extension{ get; set; }
    }
}
