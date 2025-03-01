using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings;

public class SettingsMap : IEntityTypeConfiguration<Settings>
{
    public void Configure(EntityTypeBuilder<Settings> builder)
    {

        builder.HasKey(x => x.Id);
        builder.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
        builder.Property(t => t.Key).HasColumnName("KEY");
        builder.Property(t => t.Value).HasColumnName("VALUE");
        builder.ToTable("TB_SETTINGS");
    }
}

