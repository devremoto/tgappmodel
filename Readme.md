# TUGON App Model

TUGON App Model is a basic .NET core web application ready with some features including new libraries and frameworks.
At the frontend we use angular 8 and at back and we have a REST api with .net Core and DDD approach

## Backend

- .Net CORE 3.0
- Asp.net CORE
- Entityframework CORE
- Swagger
- NLog
- BingTranslate API

## Frontend

- T4 (Text Template Transformation Toolkit)
- Angular 9
- NG Bootstrap
- NGX Translate
- Angular2Toaster
- CoreUI (Admin)
- AGM Core - Google maps

# Getting started

## Requiriments

### Backend

The back needs .net core sdk 3.0

> [`.NET Core SDK 3.0` - **Donwload** - https://dotnet.microsoft.com/download ](https://dotnet.microsoft.com/download 'Donwload')

### Frontend

The frontend needs angular 9, to install angular you need first install node js

> [`NodeJS 12.13.0` - **Donwload** - https://nodejs.org/en ](https://nodejs.org/en/ 'Donwload')

If you already have the node installed you dont,t need to re-install, go to angular instalation

```bat
npm i -g @angular/cli@9.0.0-rc.2
```

> [`Angular` - **Website** - https://angular.io/ ](https://angular.io/)

## Run

In order to run the applicaction localy execute the command:
`run-local.bat` on root folder

## Unit Tests

The unit tests runs EF Core on Memory, you can find the tests on `Tests` Folder

**Obs.:** The tests covers only the Repositories

## EF Migration

The app already comes with inital migration on Data project, but if you need to add migrations as shown below:

### Visual Studio

```
Add-Migration migration_name -s Api -p Data -c AppDbContext
Update-Database -s Api -p Data -c AppDbContext
```

### dotnet CLI

In case you don't have install ef tools, run on the console:

```
dotnet tool install --global dotnet-ef
```

```
dotnet ef migrations add migration_name -s Api -p Data -c AppDbContext
dotnet ef database update -s Api -p Data -c AppDbContext
```

## Databases

The app uses EntityframeworkCore as ORM, so you can use other relational databases, for instance:

- SQL Server
- Sqlite
- PostgreSQL
- In Memory

You can edite the `appsettings.json` on Api project

```JSON
"ConnectionStrings": {
    "SqliteDbConnection": "Data Source=../Data/DB/appDBModel.db",
    "SqlServerDbConnection": "Server=.;Initial Catalog=appDBModel;Persist Security Info=False;User ID=sa;Password=pa$$;MultipleActiveResultSets=False;Connection Timeout=30;",
    "MysqlDbConnection": "server=localhost,port=3306;database=jpproject;user=root;password=pa$$",
    "PostgreSqlDbConnection": "Server=localhost;Port=5432;Database=appDBModel;User Id=user;Password=pa$$;",
    "InMemoryDbConnection": "appDBModel"
  },
  "AppModelConfiguration": {
    ...
    "DbType": "SQLITE" // "SQLSERVER", "INMEMORY"
  },
```

> In `Api\Startup.cs` - make sure that you are using `UseSqlite`.

# Environment variables

Set the enviroment variables for the project, You can also use the /API/appsetings.json for Backend and `/Web/src/app/envirement/enviroment.ts` and `/Web/src/app/config.ts` for frontend,

Or you can set the enviroment variables as below

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
setx  AppModelConfiguration_ClientId="tgappmodel"
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
setx  BingTranslateConfiguration:Key "YOUR_BING_TRANSLATE_KEY"
```

## Linux - Uuntu

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
export  AppModelConfiguration_ClientId="tgappmodel"
export  AppModelConfiguration_RequireHttpsMetadata false
export  AppModelConfiguration_ApiUrl http://localhost:52050/api/
export  AppModelConfiguration_HostServer http://localhost
export  AppModelConfiguration_HostPort 4200
export  AppModelConfiguration_ImgFolder "~/images"
export  SmtpConfiguration_DisplayName "Your Name"
export  SmtpConfiguration_EnableSsl false
export  SmtpConfiguration_MailAddress "your@email.com"
export  SmtpConfiguration_Password "YourPa$$w0rd"
export  SmtpConfiguration_Port 587
export  SmtpConfiguration_Server "your.mailserver.com"
export  SmtpConfiguration_User "your_user_name"
export  BingTranslateConfiguration_Key "YOUR_BING_TRANSLATE_KEY"
```

# Identity Server

This project uses Identity Server as Identity Provider and token issuer.

## Identity Server (IdentityServer4.Admin - .net core)

The frontend and back and are protected by [IdentityServer4](https://github.com/IdentityServer/IdentityServer4 'IdentityServer4 github repository') and [Skoruba](https://github.com/skoruba/IdentityServer4.Admin 'Skoruba IdentityServer Admin - github repository') to IdentyServer Managment

> **Server** [http://localhost:5000 - Identity Server - Token Issuer ](http://localhost:5000 'Token Issuer') > **Admin** [http://localhost:9000 - Identity Server - Admin ](http://localhost:9000 'Identity Server - Admin')

You can also download my customized version at [https://github.com/devremoto/identity](github.com/devremoto/identity), that customized version already comes with the basic set up for this application.

### Default credentials for admin

> - **login** "admin";
> - **pass** "Pa\$\$word123";
> - **email** "admin@example.com";

## DOCKER

The application is configured to run on docker:

### API

- Api\Dockerfile

### Web

- Web\Dockerfile

At root folder we have the docker-compose scripts for build and run the containers

> BUIL docker-compose-build-build.yml
> RUN docker-compose-build-run.yml

# Scripts

There some bach and shel scripts to help with the commands

## Windows

> Set `pre.bat` according to your needs
> Rename the file `env.bat.txt` to `env.bat` to SET ENV VARIABLES
> install.bat - BUILD the images run the conainers
> run.bat - RUN the containers
> run-local.bat - run the app locally - NO DOCKER

## LINUX - Ubuntu

> Set `pre.sh` according to your needs
> Rename the file `env.sh.txt` to `env.sh` to SET ENV VARIABLES
> install.sh - BUILD the images run the conainers
> run.sh - RUN the containers
> run-local.sh - run the app locally - NO DOCKER

`Obs` on linux don't forget to turn the `.sh` files into executables first with

ex.:

```sh
sudo chmod +x ./install.sh && ./install.sh
sudo chmod +x ./run.sh && ./run.sh
sudo chmod +x ./run-local.sh && ./run-local.sh
sudo chmod +x ./env.sh && ./env.sh
sudo chmod +x ./pre.sh && ./pre.sh
```

# Code Generation - T4

At the folder `Infra/Templates` whe have the tamplates that helps to generate the code to the whole application, base on the entites on `Domain` Project

Obs: The code generation currentily works on <b>Visual Studio</b> versions
unfortunatelly it doesn't work properly on <b>Visual Studio Code</b> due to the lach of EnvDte Library, but if you want to try, there's a project call TT-Processor as discribed bellow:

On visual studio code uses the extension
TT-Processor

You need to open File -> Preferences -> Settings and add path in TTPath. OR You can also add following configuration in settings.json. You can add following path in configuration.

- `Windows`: "ttProcessor.TTPath": "C:\\\"Program Files (x86)\"\\\"Common Files\"\\\"microsoft shared\"\\TextTemplating\\14.0\\TextTransform.exe"
- `Mac`: "ttProcessor.TTPath": "mono \"/Applications/Visual Studio.app/Contents/Resources/lib/monodevelop/AddIns/MonoDevelop.TextTemplating/TextTransform.exe\""
  Note: You need to have Visual Studio For Mac installed.
- `Linux`: "ttProcessor.TTPath": "/usr/lib/monodevelop/AddIns/MonoDevelop.TextTemplating/TextTransform.exe"
  Note: You need to have monodevelop installed.

# Contact

## Get in touch with [Tugon](http://www.tugon.com.br)

- **Mobile** +55 11 9 9353-6732
- **WathsApp** [+55 11 9 9353-6732](https://Api.whatsapp.com/send?phone=5511993536732&text=I%20want%20to%20receive%20more%20information%20about%20TUGON%20app%20model)
- **E-mail** [adilson@almeidapedro.com.br](mailto:adilson@almeidapedro.com.br)
- **Web** [devremoto.com.br](www.devremoto.com.br) / [www.tugon.com.br](www.tugon.com.br)
- **Resume** [adilson.almeidapedro.com.br](http://adilson.almeidapedro.com.br)
- **LinkedIn** [linkedin.com/in/adilsonpedro](https://linkedin.com/in/adilsonpedro)
- **Facebook** [facebook.com/DesenvolvedorRemoto](https://facebook.com/DesenvolvedorRemoto)
- **Skype** [fazsite](skype:fazsite?call)
- **Github** [github.com/devremoto](https://github.com/devremoto)
- **Twitter** [twitter.com/zumcoder](https://twitter.com/zumcoder)

## DISABLE HSTS FROM localhost

chrome://net-internals/#hsts
