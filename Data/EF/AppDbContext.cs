using Data.EF.Mappings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Data.EF;

public partial class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{

    private readonly bool _useMap = true;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new AboutMap());
        modelBuilder.ApplyConfiguration(new ContactMap());
        modelBuilder.ApplyConfiguration(new LanguageMap());
        modelBuilder.ApplyConfiguration(new MailingMap());
        modelBuilder.ApplyConfiguration(new SettingsMap());
        modelBuilder.ApplyConfiguration(new SocialNetworkMap());
        modelBuilder.ApplyConfiguration(new UploadFileMap());


        if (_useMap)
            Map(modelBuilder);

        if (_useMap)
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                modelBuilder.Entity(entityType.Name).Property<DateTime>("LastModified");
                modelBuilder.Entity(entityType.Name).Property<DateTime>("AddedIn");
                modelBuilder.Entity(entityType.Name).Ignore("IsDirty");
            }
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.EnableSensitiveDataLogging();
    }

    public override int SaveChanges()
    {

        if (_useMap)
        {
            foreach (var entry in ChangeTracker.Entries()
             .Where(e => e.State == EntityState.Added))
            {
                entry.Property("AddedIn").CurrentValue = DateTime.Now;
            }

            foreach (var entry in ChangeTracker.Entries()
             .Where(e => e.State == EntityState.Added ||
                         e.State == EntityState.Modified))
            {
                entry.Property("LastModified").CurrentValue = DateTime.Now;
            }
        }
        return base.SaveChanges();
    }
}
