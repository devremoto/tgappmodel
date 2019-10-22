using Application.AutoMapper;
using AutoMapper;
using AutoMapper.Configuration;
using CrossCutting.Services;
using CrossCutting.Services.Configuration;
using CrossCutting.Services.Zip;
using Data.UoW;
using Domain.Interfaces;
//using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.Reflection;
using IConfiguration = Microsoft.Extensions.Configuration.IConfigurationRoot;
using CrossCutting.Services.Services;
using CrossCutting.Services.Mail;

namespace CrossCutting.IoC
{
    public static class IocBootStrapper
    {

        public static void RegisterServices(this IServiceCollection services, IConfiguration configuration)
        {
			services.AddOptions();			
			//services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddAutoMapper(typeof(MapperConfig).GetTypeInfo().Assembly);
            services.AddAppServices();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
			services.AddZipCodeConfiguration();
			services.AddSmtpConfiguration(configuration);
			services.AddBingConfiguration(configuration);

        }

		public static void SetConfiguration<T>(this IServiceCollection services)
		where T: class
		{
			services.Configure<T>(typeof(T).Name, opt=> { });
		}

		public static T GetConfiguration<T>(this IConfiguration configuration)
		where T : class
		{
			return configuration.GetSection(typeof(T).Name).Get<T>();
		}
		public static void AddBingConfiguration(this IServiceCollection services, IConfiguration configuration)
		{
			//services.SetConfiguration<BingTranslateConfiguration>();
			var bingTranslateConfiguration = configuration.GetSection(nameof(BingTranslateConfiguration)).Get<BingTranslateConfiguration>();
			services.AddSingleton(bingTranslateConfiguration);
			services.AddTransient<ITranslateService, BingTranslateService>();

		}
		public static void AddSmtpConfiguration(this IServiceCollection services, IConfiguration configuration)
		{
			//services.SetConfiguration<SmtpConfiguration>();
			var smtpConfiguration = configuration.GetSection(nameof(SmtpConfiguration)).Get<SmtpConfiguration>();
			services.AddSingleton(smtpConfiguration);
			services.AddTransient<IEmailService, EmailService>();
		}

		public static void AddZipCodeConfiguration(this IServiceCollection services)
		{
			services.AddTransient<IZipCode, ZipCodeBr>();
		}
	}
}