using Microsoft.AspNetCore.Authentication;

namespace Api.Helpers
{
	public class AuthOptions: AuthenticationSchemeOptions
	{
		public AuthOptions()
		{
		}
		public static string DefaultScheme { get; } = "TgAppModelScheme";
	}
}