using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings
{
    public class MailingMap: IEntityTypeConfiguration<Mailing>
    {
        public void Configure(EntityTypeBuilder<Mailing> builder)
        {

			builder.HasKey(x => x.Id);
            builder.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
            builder.Property(t => t.Email).HasColumnName("EMAIL");
            builder.Property(t => t.Active).HasColumnName("ACTIVE");
			builder.ToTable("TB_MAILING");   
        }
    }
}

