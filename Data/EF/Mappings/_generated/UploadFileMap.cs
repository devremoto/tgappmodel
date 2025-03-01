using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.EF.Mappings;

public class UploadFileMap : IEntityTypeConfiguration<UploadFile>
{
    public void Configure(EntityTypeBuilder<UploadFile> builder)
    {

        builder.HasKey(x => x.Id);
        builder.Property(t => t.Id).HasColumnName("ID");
        builder.Property(t => t.Name).HasColumnName("NAME");
        builder.Property(t => t.InputFileField).HasColumnName("INPUT_FILE_FIELD");
        builder.Property(t => t.Size).HasColumnName("SIZE");
        builder.Property(t => t.Type).HasColumnName("TYPE");
        builder.Property(t => t.FileName).HasColumnName("FILE_NAME");
        builder.Property(t => t.Controller).HasColumnName("CONTROLLER");
        builder.Property(t => t.Extension).HasColumnName("EXTENSION");
        builder.ToTable("TB_UPLOAD_FILE");
    }
}

