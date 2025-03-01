using System;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels;

public partial class ContactViewModel
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
}
