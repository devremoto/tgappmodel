using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels
{
    public partial class SocialNetworkViewModel
    {
		[Key]
		public Guid Id{ get; set; }
		public string Name{ get; set; }
		public string CssIcon{ get; set; }
		public string Url{ get; set; }
		public bool Active{ get; set; }
    }
}
