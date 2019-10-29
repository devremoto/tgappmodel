using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Api.Helpers
{
	public class AuthHandler : AuthenticationHandler<AuthOptions>
	{

		public AuthHandler(
			IOptionsMonitor<AuthOptions> options,
			ILoggerFactory logger,
			UrlEncoder encoder,
			ISystemClock clock)
			: base(options, logger, encoder, clock)
		{
		}

		protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
		{

			var claims = new[] {
				new Claim(ClaimTypes.NameIdentifier, ""),
				new Claim(ClaimTypes.Role, "admin"),
			};
			var identity = new ClaimsIdentity(claims, AuthOptions.DefaultScheme);
			var principal = new ClaimsPrincipal(identity);
			var ticket = new AuthenticationTicket(principal, AuthOptions.DefaultScheme);

			return await Task.FromResult(AuthenticateResult.Success(ticket));
		}
	}
}
