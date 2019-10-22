using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings
{
    public class SocialNetworkMap: IEntityTypeConfiguration<SocialNetwork>
    {
        public void Configure(EntityTypeBuilder<SocialNetwork> builder)
        {

			builder.HasKey(x => x.Id);
            builder.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
            builder.Property(t => t.Name).HasColumnName("NAME");
            builder.Property(t => t.CssIcon).HasColumnName("CSS_ICON");
            builder.Property(t => t.Url).HasColumnName("URL");
            builder.Property(t => t.Active).HasColumnName("ACTIVE");
			builder.ToTable("TB_SOCIAL_NETWORK");   
        }
    }
}

