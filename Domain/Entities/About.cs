using System;
using System.Text.Json.Serialization;

namespace Domain.Entities;
[JsonSerializable(typeof(About))]
public class About
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
}
