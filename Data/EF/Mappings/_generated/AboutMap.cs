using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings;

public class AboutMap : IEntityTypeConfiguration<About>
{
    public void Configure(EntityTypeBuilder<About> builder)
    {

        builder.HasKey(x => x.Id);
        builder.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
        builder.Property(t => t.Title).HasColumnName("TITLE");
        builder.Property(t => t.Image).HasColumnName("IMAGE");
        builder.Property(t => t.Description).HasColumnName("DESCRIPTION");
        builder.ToTable("TB_ABOUT");
    }
}

