﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels;

public partial class SettingsViewModel
{
    [Key]
    public Guid Id { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
}
