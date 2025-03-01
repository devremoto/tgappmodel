using Domain.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System.Collections.Generic;
using System.Linq;

namespace Data.EF;

public static class AppDbContextExtensions
{
    public static void EnsureSeedDataForContext(this AppDbContext context)
    {
        _ = new List<Language>();
        if (context.Languages.Any())
        {
            _ = context.Languages.ToList();
        }
        else
        {

            List<Language> languages = new List<Language>
            {
                new Language
                {
                    Name ="português",
                    Active=true,
                    Code="pt-br"
                },
                new Language
                {
                    Name ="english",
                    Active=true,
                    Code="en-us"
                },
                new Language
                {
                    Name ="spanish",
                    Active=true,
                    Code="es-es"
                }
            };

            context.Languages.AddRange(languages);
        }


        if (!context.SocialNetworks.Any())
        {
            context.SocialNetworks.AddRange(
                new List<SocialNetwork>
                {
                    new SocialNetwork
                    {
                        Name="facebook",
                        Active=true,
                        CssIcon="fa fa-facebook",
                        Url="https://www.facebook.com/tugonti"

                    }
                }

                );
        }
        context.SaveChanges();
    }

    public static bool AllMigrationsApplied(this AppDbContext context)
    {
        var applied = context.GetService<IHistoryRepository>()
            .GetAppliedMigrations()
            .Select(m => m.MigrationId);

        var total = context.GetService<IMigrationsAssembly>()
            .Migrations
            .Select(m => m.Key);

        return !total.Except(applied).Any();
    }
}
