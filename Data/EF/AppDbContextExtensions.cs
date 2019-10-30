using Domain.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Data.EF
{
    public static class AppDbContextExtensions
    {
        public static void EnsureSeedDataForContext(this AppDbContext context)
        {
            var languages = new List<Language>();
            if (context.Languages.Any())
            {
                languages = context.Languages.ToList();
            }
            else
            {

                languages = new List<Language>
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

                        },
                        new SocialNetwork
                        {
                            Name="Github",
                            Active=true,
                            CssIcon="fa fa-github",
                            Url="https://github.com/devremoto"

                        },
                        new SocialNetwork
                        {
                            Name="Linkedin",
                            Active=true,
                            CssIcon="fa fa-linkedin",
                            Url="https://linkedin.com/in/adilsonpedro"

                        },
                        new SocialNetwork
                        {
                            Name="Skype",
                            Active=true,
                            CssIcon="fa fa-skype",
                            Url="skype:fazsite?call"

                        },
                        new SocialNetwork
                        {
                            Name="Twitter",
                            Active=true,
                            CssIcon="fa fa-twitter",
                            Url="https://twitter.com/zumcoder"

                        },
                        new SocialNetwork
                        {
                            Name="Resume",
                            Active=true,
                            CssIcon="fa fa-file",
                            Url="http://adilson.almeidapedro.com.br"

                        },
                        new SocialNetwork
                        {
                            Name="Blog",
                            Active=true,
                            CssIcon="fa fa-rss",
                            Url="http://devremoto.com.br"

                        },
                        new SocialNetwork
                        {
                            Name="Tugon",
                            Active=true,
                            CssIcon="fa fa-globe",
                            Url="http://tugon.com.br"

                        },
                        new SocialNetwork
                        {
                            Name="email",
                            Active=true,
                            CssIcon="fa fa-at",
                            Url="mailto:adilson@almeidapedro.com.br?subject=Contact&body=Hi, Good Morning!"
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
}
