using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Api.Context;

public class WorkContext(IHttpContextAccessor httpContextAccessor) : IWorkContext
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public ApplicationUser User
    {
        get { return GetUser(); }
    }

    private ApplicationUser GetUser()
    {
        return GetLoggedUser();
    }

    protected T GetHttpContextFeature<T>()
    {
        return _httpContextAccessor.HttpContext?.Request == null
            ? default
            : _httpContextAccessor.HttpContext.Features.Get<T>();
    }

    private ApplicationUser GetLoggedUser()
    {
        var claims = GetClaims();
        var id = claims.FindFirst("Id")?.Value ?? string.Empty;
        //var roles = _authService.GetRolesAsync(new ApplicationUser { Id = id }).Result?.ToList();
        return claims != null ? new ApplicationUser
        {
            Id = id,
            Email = claims.FindFirstValue(ClaimTypes.Email),
            //Roles = roles
        } : null;
    }

    private ClaimsPrincipal GetClaims()
    {
        return _httpContextAccessor?.HttpContext?.User;
    }
}
