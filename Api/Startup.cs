using Api.Controllers.Hubs;
using Api.Helpers;
using Api.Helpers.Upload;
using Api.Models;
using CrossCutting.IoC;
using Data.EF;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;

namespace Api
{
    public class Startup
    {
        private readonly IConfigurationRoot _configuration;
        private readonly AppModelConfiguration _settings;
        private readonly IWebHostEnvironment _env;

        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            _configuration = builder.Build();
            _settings = _configuration.GetConfiguration<AppModelConfiguration>();
            _env = env;

        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            {
                if (_env.IsDevelopment())
                {
                    builder.AllowAnyMethod().AllowAnyHeader().WithOrigins(_settings.CorsOrigins).AllowCredentials();
                }
                else
                {
                    builder.WithOrigins(_settings.CorsOrigins).AllowAnyHeader().AllowAnyMethod();
                }
            }));

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddConfiguration(_configuration.GetSection("Logging"));
                loggingBuilder.AddConsole();
                loggingBuilder.AddFile("Logs/tgappmodel-{Date}.txt");
                loggingBuilder.AddDebug();
            });

            services.AddControllers();
            services.AddSignalR();
            services
            .AddMvcCore(options => { })
            .AddApiExplorer()
            .AddAuthorization(options =>
            {
                options.AddPolicy("Authenticated", policy => policy.RequireAuthenticatedUser());

            })
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.IgnoreNullValues = true;
            })
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling =
                                           Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services
            .AddAuthentication(options =>
            {
                options.DefaultScheme = _settings.UseAuthority ? IdentityServerAuthenticationDefaults.AuthenticationScheme : AuthOptions.DefaultScheme;
            })
            .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
            {
                options.Authority = _settings.Authority;
                options.RequireHttpsMetadata = _settings.RequireHttpsMetadata;
                options.ApiName = _settings.ApiName;
                //options.SignedOutCallbackPath = "/";
            })
            .AddTgAppModelAuthentication();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Tg App Model - Api", Version = "v1" });
                if (_settings.UseAuthority)
                {
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Scheme = "Bearer",

                        OpenIdConnectUrl = new Uri($"{_settings.Authority}/.well-known/openid-configuration/jwks"),
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl = new Uri($"{_settings.Authority}/connect/authorize"),
                                TokenUrl = new Uri($"{_settings.Authority}/connect/token"),

                                Scopes = new Dictionary<string, string>
                            {
                                {_settings.ApiName , _settings.ApiName },
                                {"openid" , "openid" },
                                {"profile", "profile" },
                                {"offline_access", "offline_access" },
                                {"role", "role" },
                                {"sso", "sso" }
                            }
                            }
                        }
                    }
                    );

                    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>(){
                            "token",
                            "id_token"
                        }
                    }
                });
                }
            });

            services.AddDatabase(_configuration, _settings);
            RegisterServices(services);
        }




        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            var logger = loggerFactory.CreateLogger("");
            app.UseCors("CorsPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
                if (context.Database.ProviderName.Contains("InMemory"))
                {
                    context.EnsureSeedDataForContext();
                }
                else if (!context.AllMigrationsApplied())
                {
                    context.Database.Migrate();
                    context.EnsureSeedDataForContext();
                }
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tg App Model API V1");
                if (_settings.UseAuthority)
                {
                    c.OAuthAppName(_settings.ApiName);
                    c.OAuthClientId(_settings.ClientId);
                    c.OAuthRealm(_settings.Authority);
                    c.OAuthAdditionalQueryStringParams(new Dictionary<string, string> { { "nonce", Guid.NewGuid().ToString() } });
                }
            });

            logger.LogInformation("Swagger runing on http://localhost:52050/swagger");
            app.UseRouting();

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationHub>("/NotificationHub");
                endpoints.MapControllers();

            });
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddSingleton(_settings);
            services.AddTransient<IUploadHelper, UploadHelper>();
            services.AddTransient<INotificationHub, NotificationHub>();
            services.RegisterServices(_configuration);
        }
    }
}
