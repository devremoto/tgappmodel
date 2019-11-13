using Application.Interfaces;
using Application.Services;
using Data.Repositories;
using Domain.Interfaces;
using Domain.Services;
using Domain.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CrossCutting.IoC
{
    public static class IoCGenerated
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
			services.AddTransient<IAboutAppService, AboutAppService>();
			services.AddTransient<IAboutRepository, AboutRepository>();
			services.AddTransient<IAboutService, AboutService>();

			services.AddTransient<IContactAppService, ContactAppService>();
			services.AddTransient<IContactRepository, ContactRepository>();
			services.AddTransient<IContactService, ContactService>();

			services.AddTransient<ILanguageAppService, LanguageAppService>();
			services.AddTransient<ILanguageRepository, LanguageRepository>();
			services.AddTransient<ILanguageService, LanguageService>();

			services.AddTransient<IMailingAppService, MailingAppService>();
			services.AddTransient<IMailingRepository, MailingRepository>();
			services.AddTransient<IMailingService, MailingService>();

			services.AddTransient<ISettingsAppService, SettingsAppService>();
			services.AddTransient<ISettingsRepository, SettingsRepository>();
			services.AddTransient<ISettingsService, SettingsService>();

			services.AddTransient<ISocialNetworkAppService, SocialNetworkAppService>();
			services.AddTransient<ISocialNetworkRepository, SocialNetworkRepository>();
			services.AddTransient<ISocialNetworkService, SocialNetworkService>();

			services.AddTransient<IUploadFileAppService, UploadFileAppService>();
			services.AddTransient<IUploadFileRepository, UploadFileRepository>();
			services.AddTransient<IUploadFileService, UploadFileService>();

            return services;
        }
    }
}
