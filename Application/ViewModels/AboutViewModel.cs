using System;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels;

[Serializable]
public partial class AboutViewModel
{
    [Key]
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
}
