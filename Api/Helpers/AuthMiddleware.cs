using System;
using Microsoft.AspNetCore.Authentication;

namespace Api.Helpers
{
	public static class AuthMiddlewareExtensions
    {
		public static AuthenticationBuilder AddTgAppModelAuthentication(this AuthenticationBuilder builder, Action<AuthOptions> configureOptions = null)
		{
			return builder.AddScheme<AuthOptions, AuthHandler>(AuthOptions.DefaultScheme, configureOptions);
		}
	}
}