@echo off
title=SETTING ENVIRONMENT VARIABLES
set PORT=4200
setx  AppModelConfiguration:ApiName "api1"
setx  AppModelConfiguration:Authority "https://sts.skoruba.local"
setx  AppModelConfiguration:UseAuthority true
setx  AppModelConfiguration:CorsOrigins:0 http://ssoadmin.tugon.com.br
setx  AppModelConfiguration:CorsOrigins:1 http://localhost:8100
setx  AppModelConfiguration:CorsOrigins:2 http://localhost:%PORT%
setx  AppModelConfiguration:CorsOrigins:3 http://tugon.com.br
setx  AppModelConfiguration:CorsOrigins:4 http://www.tugon.com.br
setx  AppModelConfiguration:CorsOrigins:5 http://localhost:8200
setx  AppModelConfiguration:CorsOrigins:6 http://localhost:8300
setx  AppModelConfiguration:MapKey "AIzaSyDAH-QaU1_sAvHnPzqDR-OKRns_kCHFTwg"
setx  AppModelConfiguration:RequireHttpsMetadata false
setx  AppModelConfiguration:ApiUrl http://localhost:8888/api/
setx  AppModelConfiguration:HostServer http://localhost
setx  AppModelConfiguration:HostPort %PORT%
setx  AppModelConfiguration:ImgFolder "~/images"
setx  SmtpConfiguration:DisplayName "Adilson"
setx  SmtpConfiguration:EnableSsl false
setx  SmtpConfiguration:MailAddress "adilson@almeidapedro.com.br"
setx  SmtpConfiguration:Password "Semsenhangr123#"
setx  SmtpConfiguration:Port 587
setx  SmtpConfiguration:Server "mail.almeidapedro.com.br"
setx  SmtpConfiguration:User "adilson@almeidapedro.com.br"
setx  BingTranslateConfiguration:Key "d579608a2f8942d48f82f992e3c8e821"

rem runas /env /user:%name% cmd
SET ASPNETCORE_URLS=http://*:55300