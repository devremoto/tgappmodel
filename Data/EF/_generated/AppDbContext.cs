using Data.EF.Mappings;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.EF
{
    public partial class AppDbContext
    {
        public DbSet<About> Abouts { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Mailing> Mailings { get; set; }
        public DbSet<Settings> Settingss { get; set; }
        public DbSet<SocialNetwork> SocialNetworks { get; set; }
        public DbSet<UploadFile> UploadFiles { get; set; }

	private static void Map(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AboutMap());
            modelBuilder.ApplyConfiguration(new ContactMap());
            modelBuilder.ApplyConfiguration(new LanguageMap());
            modelBuilder.ApplyConfiguration(new MailingMap());
            modelBuilder.ApplyConfiguration(new SettingsMap());
            modelBuilder.ApplyConfiguration(new SocialNetworkMap());
            modelBuilder.ApplyConfiguration(new UploadFileMap());
        }
	}
}
