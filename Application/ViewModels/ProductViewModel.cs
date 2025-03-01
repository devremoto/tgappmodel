using System;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels;

public partial class ProductViewModel
{
    [Key]
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public Double Price { get; set; }
}
