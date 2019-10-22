using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels
{
    public partial class AboutViewModel
    {
		[Key]
		public Guid Id{ get; set; }
		public string Title{ get; set; }
		public string Image{ get; set; }
		public string Description{ get; set; }
    }
}
