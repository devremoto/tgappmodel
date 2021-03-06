using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using Web.Models;
using Microsoft.AspNetCore.SpaServices;

namespace web
{
  public class Startup
  {
    public Startup(IWebHostEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddOptions();
      services.AddLogging(loggingBuilder =>
      {
        loggingBuilder.AddConfiguration(Configuration.GetSection("Logging"));
        loggingBuilder.AddConsole();
        loggingBuilder.AddFile("Logs/tgappmodel-{Date}.txt");
        loggingBuilder.AddDebug();
      });
      services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
      services.AddControllers();
      services.AddMvcCore(options =>
      {
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddFile("Logs/log-{Date}.txt");

      app.UseCors(builder => builder.WithOrigins("http://tugon.com.br", "http://www.tugon.com.br").AllowAnyHeader().AllowAnyMethod());
      app.UseExceptionHandler("/Home/Error");
      if (env.IsDevelopment())
      {
        app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        app.UseDeveloperExceptionPage();
      }

      app.UseRouting();

      app.UseStaticFiles(new StaticFileOptions
      {
        OnPrepareResponse = content =>
        {
          if (content.File.Name.EndsWith(".js.gz"))
          {
            content.Context.Response.Headers["Content-Type"] = "text/javascript";
            content.Context.Response.Headers["Content-Encoding"] = "gzip";

          }

          if (content.File.Name.EndsWith(".css.gz"))
          {
            content.Context.Response.Headers["Content-Type"] = "text/css";
            content.Context.Response.Headers["Content-Encoding"] = "gzip";
          }
        }
      });
      app.UseSpa(spa =>
      {
        // To learn more about options for serving an Angular SPA from ASP.NET Core,
        // see https://go.microsoft.com/fwlink/?linkid=864501

        spa.Options.SourcePath = "../Web";

        if (env.IsDevelopment())
        {
          spa.Options.StartupTimeout = TimeSpan.FromSeconds(600);
          spa.UseAngularCliServer(npmScript: "start-dev & echo");
          spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
          //spa.
        }
      });
      app.UseEndpoints(endpoints => endpoints.MapControllers());


    }



    private Task SetAntiForegery(HttpContext context, IAntiforgery antiforgery, RequestDelegate next)
    {
      string path = context.Request.Path.Value;

      // We can send the request token as a JavaScript-readable cookie,
      // and Angular will use it by default.
      var tokens = antiforgery.GetAndStoreTokens(context);
      context.Response.Cookies.Append(".AspNetCore.Antiforgery.WMJChxWiODM", tokens.RequestToken,
          new CookieOptions() { HttpOnly = false });

      return next(context);
    }
  }


}
