using Api.Context;
using Api.Helpers.Upload;
using Api.Models;
using CrossCutting.IoC;
using Data.EF;
using Domain;
using Domain.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NSwag.AspNetCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Api;

public class Startup
{
    private static AppModelConfiguration _appModelConfiguration;
    public readonly IConfiguration _configuration;
    private readonly AppSettings _settings;
    private readonly IWebHostEnvironment _env;
    private static readonly ILoggerFactory DbLoggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
        _configuration = configuration;
        _env = env;
        _settings = _configuration.GetSection(AppSettings.SECTION).Get<AppSettings>();
        _appModelConfiguration = _configuration.GetSection(AppSettings.SECTION).Get<AppModelConfiguration>();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddHttpContextAccessor()
            .AddScoped<IWorkContext, WorkContext>()
            .AddSingleton(_appModelConfiguration)
            .AddSingleton(_settings)
            .AddTransient<IUploadHelper, UploadHelper>()
            .AddServices(_configuration, _env, DbLoggerFactory)
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.WriteIndented = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        // Use the named CORS policy registered in IoC. Must be between UseRouting and UseAuthentication/UseAuthorization
        app.UseCors("CorsPolicy");

        // Authentication/Authorization
        app.UseAuthentication();
        app.UseAuthorization();

        // Apply migrations/seed data
        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

            if (!context.AllMigrationsApplied())
            {
                context.Database.Migrate();
                context.EnsureSeedDataForContext();
            }
        }

        if (env.IsDevelopment())
        {
            app
                .UseOpenApi()
                .UseSwaggerUi(settings =>
                    {
                        settings.OAuth2Client = new OAuth2ClientSettings
                        {
                            ClientId = "swagger",
                            AppName = _settings.ApiName,
                            UsePkceWithAuthorizationCodeGrant = true,
                            ClientSecret = string.Empty,
                            ScopeSeparator = " ",
                            Realm = _settings.Authority,
                        };
                    });
                
        }

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

}
