using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain.Entities;

public class ApplicationUser : IdentityUser
{

    public List<IdentityUserClaim<string>> Claims { get; set; }
    public List<IdentityUserRole<string>> UserRoles { get; set; }
    public IEnumerable<string> Roles { get; set; }
    public string PictureId { get; set; }
    public bool Active { get; set; }
    public string Name { get; set; }
}
