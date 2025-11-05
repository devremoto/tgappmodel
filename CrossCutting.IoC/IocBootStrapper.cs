using Application.AutoMapper;
using Application.Interfaces;
using Application.Services;
using CrossCutting.Services.Configuration;
using CrossCutting.Services.Mail;
using CrossCutting.Services.Services;
using CrossCutting.Services.Zip;
using Data.EF;
using Data.Repositories;
using Data.UoW;
using Domain;
using Domain.Interfaces;
using Domain.Services;
using Domain.Services.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NSwag;
using NSwag.Generation.Processors.Contexts;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using static IdentityModel.OidcConstants;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace CrossCutting.IoC;

public static class IocBootStrapper
{
    private static IConfiguration _configuration;
    private static AppSettings _settings;
    private static IHostEnvironment _env;
    private static ServiceProvider _provider;


    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env, ILoggerFactory loggerFactory)
    {
        services

        .AddConfiguration(configuration, env)
        .AddMapper()
        .AddAuthService()
        .AddLogConfiguration(configuration)
        .AddSmtpConfiguration(configuration)
        .AddDatabase<AppDbContext>(loggerFactory)
        .AddBingConfiguration(configuration)
        .RegisterCors()
        .AddServices()
        .AddCrudServices()
        .AddSwagger();

        return services;

    }
    private static IServiceCollection AddCrudServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
        services.AddScoped(typeof(IBaseAppService<>), typeof(BaseAppService<>));
        IoCGenerated.AddAppServices(services);
        #region CrudServices
        #endregion CrudServices
        return services;
    }
    private static IServiceCollection RegisterCors(this IServiceCollection services)
    {

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            {
                if (_env.IsDevelopment())
                {
                    builder.AllowAnyMethod().AllowAnyHeader().WithOrigins(_settings.Cors.Origins).AllowCredentials();
                }
                else
                {
                    builder.WithOrigins(_settings.Cors.Origins).AllowAnyHeader().AllowAnyMethod();
                }
            });
        });

        return services;
    }
    private static IServiceCollection AddConfiguration(this IServiceCollection services, IConfiguration configuration, IHostEnvironment env)
    {
        _env = env;
        var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            .AddEnvironmentVariables();

        if(configuration is null || configuration.GetChildren().Count()<=0) {
            configuration = builder.Build();
        }
        services.AddOptions();
        _settings = configuration.GetSection(AppSettings.SECTION).Get<AppSettings>();
        _settings.ImageFolder = Path.Combine(env.ContentRootPath, "images");
        if (!Directory.Exists(_settings.ImageFolder))
        {
            Directory.CreateDirectory(_settings.ImageFolder);
        }
        services.AddSingleton(_settings);
        return services;
    }

    private static IServiceCollection AddLogConfiguration(this IServiceCollection services, IConfiguration configuration
        )
    {
        services.AddLogging(loggingBuilder =>
        {
            var logSection = configuration.GetSection("Logging");
            loggingBuilder
            .AddConfiguration(logSection)
            .AddFile("Logs/myapp-{Date}.txt")
            .AddConsole();
        });

        return services;
    }
    private static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<HttpClient>()
            .AddScoped<IZipCode, ZipCodeBr>();
        return services;
    }

    #region database
    public static IServiceCollection AddDatabase<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
    {
        _ = _settings.DbType switch
        {
            DbType.SQL => services.AddSql<TContext>(factory),
            DbType.MYSQL => services.AddMysql<TContext>(factory),
            DbType.SQLLITE => services.AddSqlite<TContext>(factory),
            DbType.INMEMORY => services.AddSqlInMemory<TContext>(factory),
            DbType.POSTGRESQL => services.AddPostgres<TContext>(factory),
            _ => services.AddSql<TContext>(factory)
        };

        return services.SeedData();
    }
    private static IServiceCollection AddSql<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext

    {
        services.AddDbContext<TContext>(options =>
        {
            options.UseSqlServer(_settings.ConnectionStrings.Sql, opts =>
            {
                opts.EnableRetryOnFailure();
            });
            if (_settings.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
                if (factory != null)
                    options.UseLoggerFactory(factory);
            }
        });
        return services;
    }

    private static IServiceCollection AddMysql<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
    {
        services.AddDbContext<TContext>(options =>
        {
            var loggerFactory = new LoggerFactory();
            //var version = ServerVersion.AutoDetect(_settings.ConnectionStrings.MySql);
            options.UseMySql(_settings.ConnectionStrings.MySql, ServerVersion.AutoDetect(_settings.ConnectionStrings.MySql)
                , opts =>
           {
               opts.EnableRetryOnFailure();
           });
            if (_settings.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
                if (factory != null)
                    options.UseLoggerFactory(factory);
            }
        });

        return services;
    }

    public static IServiceCollection AddSqlInMemory<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
    {
        services.AddDbContext<TContext>(options =>
        {
            options.UseInMemoryDatabase(_settings.ConnectionStrings.InMemory, opts =>
            {
            });
            if (_settings.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
                if (factory != null)
                    options.UseLoggerFactory(factory);
            }
        });
        return services;

    }

    public static IServiceCollection AddSqlite<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
    {
        services.AddDbContext<TContext>(options =>
        {
            options.UseSqlite(_settings.ConnectionStrings.Sqlite, opts =>
            {
            });
            if (_settings.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
                if (factory != null)
                    options.UseLoggerFactory(factory);
            }
        });
        return services;

    }

    public static IServiceCollection AddPostgres<TContext>(this IServiceCollection services, ILoggerFactory factory = null) where TContext : DbContext
    {
        services.AddDbContext<TContext>(options =>
        {
            options.UseNpgsql(_settings.ConnectionStrings.PostgreSql, opts =>
            {
                opts.EnableRetryOnFailure();
            });
            if (_settings.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
                if (factory != null)
                    options.UseLoggerFactory(factory);
            }
        });
        return services;

    }
    private static IServiceCollection AddMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg =>
        {
            cfg.AddProfile<ModelToViewModel>();
        });
        return services;
    }

    private static IServiceCollection SeedData(this IServiceCollection services)
    {
        _provider = services.BuildServiceProvider();
        using (var serviceScope = _provider.GetService<IServiceScopeFactory>().CreateScope())
        {
            serviceScope.ServiceProvider.GetService<AppDbContext>().EnsureSeedDataForContext();
        }

        return services;
    }
    #endregion
    public static void SetConfiguration<T>(this IServiceCollection services)
    where T : class
    {
        services.Configure<T>(typeof(T).Name, opt => { });
    }

    public static T GetConfiguration<T>(this IConfiguration configuration)
    where T : class, new()
    {
        T instance = new T();
        // bind the configuration to the instance
        configuration.GetSection(typeof(T).Name).Bind(instance);
        return instance;
    }

    public static T GetConfiguration<T>()
where T : class, new()
    {
        T instance = new T();
        // bind the configuration to the instance
        _configuration.GetSection(typeof(T).Name).Bind(instance);
        return instance;
    }
    public static IServiceCollection AddBingConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        //services.SetConfiguration<BingTranslateConfiguration>();
        var bingTranslateConfiguration = configuration.GetConfiguration<BingTranslateConfiguration>();
        services
            .AddSingleton(bingTranslateConfiguration)
            .AddTransient<ITranslateService, BingTranslateService>();
        return services;

    }
    public static IServiceCollection AddSmtpConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        //services.SetConfiguration<SmtpConfiguration>();
        var smtpConfiguration = configuration.GetSection(nameof(SmtpConfiguration)).Get<SmtpConfiguration>();
        services.AddSingleton(smtpConfiguration);
        services.AddTransient<IEmailService, EmailService>();
        return services;
    }

    public static void AddZipCodeConfiguration(this IServiceCollection services)
    {
        services.AddTransient<IZipCode, ZipCodeBr>();
    }

    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddOpenApiDocument(c =>
        {
            c.Title = _settings.ApiName;
            c.Version = "v1";

            c.AddSecurity("OAuth2", new OpenApiSecurityScheme
            {

                Type = OpenApiSecuritySchemeType.OAuth2,
                In = OpenApiSecurityApiKeyLocation.Header,

                Flows = new OpenApiOAuthFlows
                {

                    AuthorizationCode = new OpenApiOAuthFlow
                    {

                        AuthorizationUrl = $"{_settings.Authority}/connect/authorize",
                        TokenUrl = $"{_settings.Authority}/connect/token",           // Token endpoint
                        Scopes = new Dictionary<string, string>
                        {
                            {_settings.ApiName , _settings.ApiName },
                            {"openid" , "openid" },
                            {"profile", "profile" },
                            {"offline_access", "offline_access" },
                            {"role", "role" },
                            {"email", "email" }
                        }
                    }
                }
            }
            );
            c.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("OAuth2"));
        });
        return services;
    }

    public static IServiceCollection AddAuthService(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            options.AddPolicy("Authenticated", policy => policy.RequireAuthenticatedUser());
        });

        services.AddAuthentication()
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
        {
            options.Authority = _settings.Authority;
            options.RequireHttpsMetadata = _settings.RequireHttpsMetadata;
            options.Audience = _settings.ApiName;
        });
        return services;
    }
}