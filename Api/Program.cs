using Api.Context;
using Api.Helpers.Upload;
using Api.Models;
using CrossCutting.IoC;
using Data.EF;
using Domain;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NSwag.AspNetCore;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var env = builder.Environment;
var appSettings = configuration.GetSection(AppSettings.SECTION).Get<AppSettings>();
var appModelConfiguration = configuration.GetSection(AppSettings.SECTION).Get<AppModelConfiguration>();
var dbLoggerFactory = LoggerFactory.Create(lb => lb.AddConsole());


if (env.IsDevelopment())
{
    builder.Services.AddHttpClient().ConfigureAll<HttpClientHandler>((handler) =>
    {
        handler.ServerCertificateCustomValidationCallback =
            HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
    });
}
builder.Services
    .ApiServicesConfiguration(appSettings, appModelConfiguration)
    .AddServices(configuration, env, dbLoggerFactory)
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.WriteIndented = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

var app = builder.Build();

if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

if (!env.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

// Apply migrations/seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetService<AppDbContext>();

    if (context != null && !context.AllMigrationsApplied())
    {
        context.Database.Migrate();
        context.EnsureSeedDataForContext();
    }
}

if (env.IsDevelopment())
{
    app
        .UseOpenApi()
        .UseSwaggerUi(uiSettings =>
        {
            uiSettings.OAuth2Client = new OAuth2ClientSettings
            {
                ClientId = "swagger",
                AppName = appSettings?.ApiName,
                UsePkceWithAuthorizationCodeGrant = true,
                ClientSecret = string.Empty,
                ScopeSeparator = " ",
                Realm = appSettings?.Authority,
            };
        });
}

app.MapControllers();

app.Run();

public static class ProgramExtensions
{
    public static IServiceCollection ApiServicesConfiguration(this IServiceCollection services, AppSettings appSettings, AppModelConfiguration appModelConfiguration)
    {
        return services
            .AddHttpContextAccessor()
            .AddScoped<IWorkContext, WorkContext>()
            .AddSingleton(appModelConfiguration)
            .AddSingleton(appSettings)
            .AddTransient<IUploadHelper, UploadHelper>();
    }
}