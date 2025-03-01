using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Data.Migrations;

public partial class Initial : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "TB_ABOUT",
            columns: table => new
            {
                ID = table.Column<Guid>(nullable: false),
                TITLE = table.Column<string>(nullable: true),
                IMAGE = table.Column<string>(nullable: true),
                DESCRIPTION = table.Column<string>(nullable: true),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_ABOUT", x => x.ID);
            });

        migrationBuilder.CreateTable(
            name: "TB_CONTACT",
            columns: table => new
            {
                ID = table.Column<Guid>(nullable: false),
                NAME = table.Column<string>(nullable: true),
                PHONE_NUMBER = table.Column<string>(nullable: true),
                EMAIL = table.Column<string>(nullable: true),
                SUBJECT = table.Column<string>(nullable: true),
                MESSAGE = table.Column<string>(nullable: true),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_CONTACT", x => x.ID);
            });

        migrationBuilder.CreateTable(
            name: "TB_LANGUAGE",
            columns: table => new
            {
                ID = table.Column<Guid>(nullable: false),
                CODE = table.Column<string>(nullable: true),
                NAME = table.Column<string>(nullable: true),
                IMAGE = table.Column<string>(nullable: true),
                ACTIVE = table.Column<bool>(nullable: false),
                DEFAULT = table.Column<bool>(nullable: false),
                LOADED = table.Column<bool>(nullable: false),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_LANGUAGE", x => x.ID);
            });

        migrationBuilder.CreateTable(
            name: "TB_MAILING",
            columns: table => new
            {
                ID = table.Column<Guid>(nullable: false),
                EMAIL = table.Column<string>(nullable: true),
                ACTIVE = table.Column<bool>(nullable: false),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_MAILING", x => x.ID);
            });

        migrationBuilder.CreateTable(
            name: "TB_SETTINGS",
            columns: table => new
            {
                ID = table.Column<Guid>(nullable: false),
                KEY = table.Column<string>(nullable: true),
                VALUE = table.Column<string>(nullable: true),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_SETTINGS", x => x.ID);
            });

        migrationBuilder.CreateTable(
            name: "TB_SOCIAL_NETWORK",
            columns: table => new
            {
                ID = table.Column<Guid>(nullable: false),
                NAME = table.Column<string>(nullable: true),
                CSS_ICON = table.Column<string>(nullable: true),
                URL = table.Column<string>(nullable: true),
                ACTIVE = table.Column<bool>(nullable: false),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_SOCIAL_NETWORK", x => x.ID);
            });

        migrationBuilder.CreateTable(
            name: "TB_UPLOAD_FILE",
            columns: table => new
            {
                ID = table.Column<string>(nullable: false),
                NAME = table.Column<string>(nullable: true),
                INPUT_FILE_FIELD = table.Column<string>(nullable: true),
                SIZE = table.Column<long>(nullable: false),
                TYPE = table.Column<string>(nullable: true),
                FILE_NAME = table.Column<string>(nullable: true),
                CONTROLLER = table.Column<string>(nullable: true),
                EXTENSION = table.Column<string>(nullable: true),
                AddedIn = table.Column<DateTime>(nullable: false),
                LastModified = table.Column<DateTime>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_TB_UPLOAD_FILE", x => x.ID);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "TB_ABOUT");

        migrationBuilder.DropTable(
            name: "TB_CONTACT");

        migrationBuilder.DropTable(
            name: "TB_LANGUAGE");

        migrationBuilder.DropTable(
            name: "TB_MAILING");

        migrationBuilder.DropTable(
            name: "TB_SETTINGS");

        migrationBuilder.DropTable(
            name: "TB_SOCIAL_NETWORK");

        migrationBuilder.DropTable(
            name: "TB_UPLOAD_FILE");
    }
}
