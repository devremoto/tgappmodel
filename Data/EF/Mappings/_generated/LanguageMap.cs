using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings
{
    public class LanguageMap: IEntityTypeConfiguration<Language>
    {
        public void Configure(EntityTypeBuilder<Language> builder)
        {

			builder.HasKey(x => x.Id);
            builder.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
            builder.Property(t => t.Code).HasColumnName("CODE");
            builder.Property(t => t.Name).HasColumnName("NAME");
            builder.Property(t => t.Image).HasColumnName("IMAGE");
            builder.Property(t => t.Active).HasColumnName("ACTIVE");
            builder.Property(t => t.Default).HasColumnName("DEFAULT");
            builder.Property(t => t.Loaded).HasColumnName("LOADED");
			builder.ToTable("TB_LANGUAGE");   
        }
    }
}

