using System;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels;

public partial class MailingViewModel
{
    [Key]
    public Guid Id { get; set; }
    public string Email { get; set; }
    public bool Active { get; set; }
}
