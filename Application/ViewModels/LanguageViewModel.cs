using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels
{
    public partial class LanguageViewModel
    {
		[Key]
		public Guid Id{ get; set; }
		public string Code{ get; set; }
		public string Name{ get; set; }
		public string Image{ get; set; }
		public bool Active{ get; set; }
		public bool Default{ get; set; }
		public bool Loaded{ get; set; }
    }
}
