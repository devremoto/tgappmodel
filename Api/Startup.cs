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
using System;
using System.Collections.Generic;
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
        services.AddHttpContextAccessor()
          .AddScoped<IWorkContext, WorkContext>()
        .AddSingleton(_appModelConfiguration);
        // .AddScoped<RequestMiddleware>();
        services.AddServices(_configuration, _env, DbLoggerFactory);
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.WriteIndented = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            })
        ;
        services
       .AddMvcCore(options => { })
       .AddApiExplorer();
        RegisterServices(services);
        services.AddCors();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //app.UseMiddleware<RequestMiddleware>();
        app.UseCors(builder => builder.WithOrigins(_settings.Cors.Origins).AllowAnyHeader().AllowAnyMethod());
        app.UseDeveloperExceptionPage();
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        app.UseDeveloperExceptionPage();

        app.UseHttpsRedirection();

        app.UseRouting();


        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

            if (!context.AllMigrationsApplied())
            {
                context.Database.Migrate();
                context.EnsureSeedDataForContext();
            }
        }

        app.UseSwagger();

        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            c.OAuthAppName(_settings.ApiName);
            c.OAuthClientId(_settings.ClientId);
            c.OAuthRealm(_settings.Authority);
            c.OAuthAdditionalQueryStringParams(new Dictionary<string, string> { { "nonce", Guid.NewGuid().ToString() } });
        });


        app.UseRouting();


        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseStaticFiles();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

    private void RegisterServices(IServiceCollection services)
    {
        services.AddSingleton(_settings);
        services.AddTransient<IUploadHelper, UploadHelper>();
    }
}
