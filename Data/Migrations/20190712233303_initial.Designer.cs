﻿// <auto-generated />
using System;
using Data.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20190712233303_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("Domain.Entities.About", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("Description")
                        .HasColumnName("DESCRIPTION");

                    b.Property<string>("Image")
                        .HasColumnName("IMAGE");

                    b.Property<DateTime>("LastModified");

                    b.Property<string>("Title")
                        .HasColumnName("TITLE");

                    b.HasKey("Id");

                    b.ToTable("TB_ABOUT");
                });

            modelBuilder.Entity("Domain.Entities.Contact", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("Email")
                        .HasColumnName("EMAIL");

                    b.Property<DateTime>("LastModified");

                    b.Property<string>("Message")
                        .HasColumnName("MESSAGE");

                    b.Property<string>("Name")
                        .HasColumnName("NAME");

                    b.Property<string>("PhoneNumber")
                        .HasColumnName("PHONE_NUMBER");

                    b.Property<string>("Subject")
                        .HasColumnName("SUBJECT");

                    b.HasKey("Id");

                    b.ToTable("TB_CONTACT");
                });

            modelBuilder.Entity("Domain.Entities.Language", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<bool>("Active")
                        .HasColumnName("ACTIVE");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("Code")
                        .HasColumnName("CODE");

                    b.Property<bool>("Default")
                        .HasColumnName("DEFAULT");

                    b.Property<string>("Image")
                        .HasColumnName("IMAGE");

                    b.Property<DateTime>("LastModified");

                    b.Property<bool>("Loaded")
                        .HasColumnName("LOADED");

                    b.Property<string>("Name")
                        .HasColumnName("NAME");

                    b.HasKey("Id");

                    b.ToTable("TB_LANGUAGE");
                });

            modelBuilder.Entity("Domain.Entities.Mailing", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<bool>("Active")
                        .HasColumnName("ACTIVE");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("Email")
                        .HasColumnName("EMAIL");

                    b.Property<DateTime>("LastModified");

                    b.HasKey("Id");

                    b.ToTable("TB_MAILING");
                });

            modelBuilder.Entity("Domain.Entities.Settings", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("Key")
                        .HasColumnName("KEY");

                    b.Property<DateTime>("LastModified");

                    b.Property<string>("Value")
                        .HasColumnName("VALUE");

                    b.HasKey("Id");

                    b.ToTable("TB_SETTINGS");
                });

            modelBuilder.Entity("Domain.Entities.SocialNetwork", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<bool>("Active")
                        .HasColumnName("ACTIVE");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("CssIcon")
                        .HasColumnName("CSS_ICON");

                    b.Property<DateTime>("LastModified");

                    b.Property<string>("Name")
                        .HasColumnName("NAME");

                    b.Property<string>("Url")
                        .HasColumnName("URL");

                    b.HasKey("Id");

                    b.ToTable("TB_SOCIAL_NETWORK");
                });

            modelBuilder.Entity("Domain.Entities.UploadFile", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<DateTime>("AddedIn");

                    b.Property<string>("Controller")
                        .HasColumnName("CONTROLLER");

                    b.Property<string>("Extension")
                        .HasColumnName("EXTENSION");

                    b.Property<string>("FileName")
                        .HasColumnName("FILE_NAME");

                    b.Property<string>("InputFileField")
                        .HasColumnName("INPUT_FILE_FIELD");

                    b.Property<DateTime>("LastModified");

                    b.Property<string>("Name")
                        .HasColumnName("NAME");

                    b.Property<long>("Size")
                        .HasColumnName("SIZE");

                    b.Property<string>("Type")
                        .HasColumnName("TYPE");

                    b.HasKey("Id");

                    b.ToTable("TB_UPLOAD_FILE");
                });
#pragma warning restore 612, 618
        }
    }
}
