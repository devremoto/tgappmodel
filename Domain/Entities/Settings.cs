using System;

namespace Domain.Entities;

public class Settings
{
    public Guid Id { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
}
