# TUGON App Model

App model is starter a .NET core web application ready with some features including new libraries and frameworks.
At the frontend we use angular 8 and at back and we have a REST api with .net Core and DDD approach

## Backend

- .Net CORE
- Asp.net CORE
- Entityframework CORE
- Swagger
- NLog
- BingTrranslate API

## Frontend

- T4 (Text Template Transformation Toolkit)
- Angular 8
- NG Bootstrap
- NGX Translate
- Angular2Toaster
- CoreUI (Admin)
- AGM Core - Google maps

## T4

On visual studio code uses the extension
TT-Processor

## Migration

The app already comes with inital migration on Data project, but if you need to add migrations as shown below:

### Visual Studio

```
Add-Migration migration_name -s Api -p Data -c AppDbContext
Update-Database -s Api -p Data -c AppDbContext
```

### dotnet CLI

```
dotnet ef migrations add migration_name -s Api -p Data -c AppDbContext
dotnet ef database update -s Api -p Data -c AppDbContext
```

## Databases

The app uses EntityframeworkCore as ORM, so you can use other reasltional databeses for instance:

- SQL Server
- Sqlite
- PostgreSQL, among other

Below are the setup sample

### Sqlite

In worder to use Sqlite first make sure you have the Nugget packages on Api project

`.NET CLI`

```bat
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Sqlite.Design
```

`Package Manager`

```bat
Install-Packge Microsoft.EntityFrameworkCore.Sqlite
Install-Packge Microsoft.EntityFrameworkCore.Sqlite.Design
```

`appsettings.json`

```JSON
"ConnectionStrings": {
    "AppDbConnection":"Data Source=../Data/DB/appDBModel.db"
  }
```

> In `Api\Startup.cs` - make sure that you are using `UseSqlite`.

### SQL Server

In worder to use SQL Server first make sure you have the Nugget packages on Api project

```
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.SqlServer.Design
```

```JSON
  "ConnectionStrings": {
    "AppDbConnection": "Data Source=localhost;Initial Catalog=appDBModel;Integrated Security=True"
  },
```

> In `Api\Startup.cs` - find all usage of UseSqlite and change to `UseSqlServer`.

### PostgreSQL

In worder to use PostgreSQL first make sure you have the Nugget packages on Api project

```
Npgsql.EntityFrameworkCore.PostgreSQL
Npgsql.EntityFrameworkCore.PostgreSQL.Design
```

> In `Api\Startup.cs` - find all usage of UseSqlite and change to `UseNpgsql`.

### MySql

In worder to use MySql first make sure you have the Nugget packages on Api project

```
Pomelo.EntityFrameworkCore.MySql
Pomelo.EntityFrameworkCore.MySql.Design
```

> In Api\Startup.cs - find all usage of UseSqlite and change to UseMySql.

## Identity Server (IdentityServer4.Admin - .net core)

The frontend and back and are protected by [IdentityServer4](https://github.com/IdentityServer/IdentityServer4 'IdentityServer4 github repository') and [Skoruba](https://github.com/skoruba/IdentityServer4.Admin 'Skoruba IdentityServer Admin - github repository') to IdentyServer Managment

> **Server** [http://localhost:5000 - Identity Server - Token Issuer ](http://localhost:5000 'Token Issuer') > **Admin** [http://localhost:9000 - Identity Server - Admin ](http://localhost:9000 'Identity Server - Admin')

### Default credentials for admin

> - **login** "admin";
> - **pass** "Pa\$\$word123";
> - **email** "admin@example.com";

#Environment variables

## windows

> In `cmd.exe` - run the following:

```bat
@echo off
title=SETTING ENVIRONMENT VARIABLES
setx  AppModelConfiguration:ApiName "api1"
setx  AppModelConfiguration:Authority "https://your.domain.com"
setx  AppModelConfiguration:UseAuthority true
setx  AppModelConfiguration:CorsOrigins:0 http://localhost:8100
setx  AppModelConfiguration:CorsOrigins:1 http://localhost:4200
setx  AppModelConfiguration:CorsOrigins:2 http://localhost:4300
setx  AppModelConfiguration:MapKey "YOUR_GOOGLE_MAPS_API_KEY"
setx  AppModelConfiguration:RequireHttpsMetadata false
setx  AppModelConfiguration:ApiUrl http://localhost:52050/api/
setx  AppModelConfiguration:HostServer http://localhost
setx  AppModelConfiguration:HostPort 4200
setx  AppModelConfiguration:ImgFolder "~/images"
setx  SmtpConfiguration:DisplayName "Adilson"
setx  SmtpConfiguration:EnableSsl false
setx  SmtpConfiguration:MailAddress "your@email.com"
setx  SmtpConfiguration:Password "YourPa$$w0rd"
setx  SmtpConfiguration:Port 587
setx  SmtpConfiguration:Server "your.mailserver.com"
setx  SmtpConfiguration:User "your_user_name"
setx  BingTranslateConfiguration:Key "YOUR_GOOGLE_MAPS_API_KEY"
```

## ubuntu

> On the `Terminal` run this command bellow:

```bash
sudo -H gedit  ~/.profile
sudo source  ~/.profile
sudo -H gedit  ~/.bashrc
sudo source  ~/.bashrc
```

> And append the sample content bellow:

```bash
export  AppModelConfiguration_ApiName "api1"
export  AppModelConfiguration_Authority "https://your.domain.com"
export  AppModelConfiguration_UseAuthority true
export  AppModelConfiguration_CorsOrigins_0 http://localhost:8100
export  AppModelConfiguration_CorsOrigins_1 http://localhost:4200
export  AppModelConfiguration_CorsOrigins_2 http://localhost:4300
export  AppModelConfiguration_MapKey "YOUR_GOOGLE_MAPS_API_KEY"
export  AppModelConfiguration_RequireHttpsMetadata false
export  AppModelConfiguration_ApiUrl http://localhost:52050/api/
export  AppModelConfiguration_HostServer http://localhost
export  AppModelConfiguration_HostPort 4200
export  AppModelConfiguration_ImgFolder "~/images"
export  SmtpConfiguration_DisplayName "Adilson"
export  SmtpConfiguration_EnableSsl false
export  SmtpConfiguration_MailAddress "your@email.com"
export  SmtpConfiguration_Password "YourPa$$w0rd"
export  SmtpConfiguration_Port 587
export  SmtpConfiguration_Server "your.mailserver.com"
export  SmtpConfiguration_User "your_user_name"
export  BingTranslateConfiguration_Key "YOUR_GOOGLE_MAPS_API_KEY"
```

# Contact

## Be in touch with [Tugon](http://www.tugon.com.br)

- **Mobile** [+55 11 9 9353-6732](https://Api.whatsapp.com/send?phone=5511993536732&text=I%20want%20to%20receive%20more%20information%20about%20TUGON%20app%20model)
- **E-mail** adilson@almeidapedro.com.br
- **Web** devremoto.com.br
- **Resume** adilson.almeidapedro.com.br
- **LinkedIn** linkedin.com/in/adilsonpedro
- **Facebook** facebook.com/DesenvolvedorRemoto
- **Skype** [fazsite](skype:fazsite?call)
- **Github** github.com/devremoto
- **Twitter** twitter.com/zumcoder
