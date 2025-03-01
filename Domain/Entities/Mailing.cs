using System;

namespace Domain.Entities;

public class Mailing
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public bool Active { get; set; }

    public void ValidateSignUp()
    {
        if (this == null)
            throw new ApplicationException("Invalid data");
        if (string.IsNullOrWhiteSpace(Email))
            throw new ApplicationException("Email can't be empty");
    }

    public void ValidateSendEmail()
    {
        if (this == null)
            throw new ApplicationException("Invalid data");
        if (string.IsNullOrWhiteSpace(Email))
            throw new ApplicationException("Email can't be empty");
    }
}
