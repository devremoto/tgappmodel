using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings
{
    public class ContactMap: IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {

			builder.HasKey(x => x.Id);
            builder.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
            builder.Property(t => t.Name).HasColumnName("NAME");
            builder.Property(t => t.PhoneNumber).HasColumnName("PHONE_NUMBER");
            builder.Property(t => t.Email).HasColumnName("EMAIL");
            builder.Property(t => t.Subject).HasColumnName("SUBJECT");
            builder.Property(t => t.Message).HasColumnName("MESSAGE");
			builder.ToTable("TB_CONTACT");   
        }
    }
}

