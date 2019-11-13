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
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using CrossCutting.Services.Services;
using CrossCutting.Services.Mail;
using Microsoft.EntityFrameworkCore;
using Data.EF;

namespace CrossCutting.IoC
{
	public static class IocBootStrapper
	{

		public static IServiceCollection RegisterServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddOptions();
			services.AddAutoMapper(typeof(MapperConfig).GetTypeInfo().Assembly);
			services.AddAppServices();
			services.AddUnitOfWork();
			services.AddZipCodeConfiguration();
			services.AddSmtpConfiguration(configuration);
			services.AddBingConfiguration(configuration);
			return services;
		}

		public static IServiceCollection ConfigureTestServices(this IServiceCollection services)
		{
			services
			.AddSqlInMemory()
			.AddUnitOfWork()
			.AddAppServices();
			return services;
		}
		public static IServiceCollection ConfigureTestServices()
		{
			return new ServiceCollection()
			.ConfigureTestServices();
		}
		public static IServiceCollection AddUnitOfWork(this IServiceCollection services)
		{
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			return services;
		}

		public static void SetConfiguration<T>(this IServiceCollection services)
		where T : class
		{
			services.Configure<T>(typeof(T).Name, opt => { });
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

		public static IServiceCollection AddSqlite(this IServiceCollection services, IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("SQliteDbConnection");

			services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));
			return services;

		}

		public static IServiceCollection AddSqlInMemory(this IServiceCollection services, IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("InMemoryDbConnection");

			services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase(connectionString));
			return services;

		}

		public static IServiceCollection AddSqlInMemory(this IServiceCollection services)
		{

			services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("InMemoryDbConnection"));
			return services;

		}

		public static IServiceCollection AddSqlServer(this IServiceCollection services, IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("SqlServerDbConnection");

			services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));
			return services;

		}

		public static ServiceProvider GetProvider(this IServiceCollection services)
		{
			return services.BuildServiceProvider();
		}


	}
}