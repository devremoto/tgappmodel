@echo off
title SETTING ENVIRONMENT VARIABLES
setx PORT 4200
setx AppModelConfiguration_ApiName "api1"
setx AppModelConfiguration_ImgFolder "images"
setx AppModelConfiguration_Authority "https://192.168.0.5:5001"
setx AppModelConfiguration_UseAuthority true
setx AppModelConfiguration_CorsOrigins_0 http://localhost:${PORT}
rem Set url for api CORS
rem setx AppModelConfiguration_CorsOrigins_1 http://localhost:8100
rem setx AppModelConfiguration_CorsOrigins_2 http://localhost:${PORT}
rem setx AppModelConfiguration_CorsOrigins_3 http://127.0.0.1
rem setx AppModelConfiguration_CorsOrigins_4 http://192.168.0.5
rem setx AppModelConfiguration_CorsOrigins_5 http://localhost:4200
rem setx AppModelConfiguration_CorsOrigins_6 http://localhost:4300

setx AppModelConfiguration_RequireHttpsMetadata false
setx AppModelConfiguration_ApiUrl http://localhost:52050/api/
setx AppModelConfiguration_MapKey "your_key"
setx AppModelConfiguration_ClientId "ssoadmin"
setx AppModelConfiguration_HostServer http://192.168.0.5
setx AppModelConfiguration_HostPort ${PORT}

setx SmtpConfiguration_DisplayName "Display Name"
setx SmtpConfiguration_EnableSsl false
setx SmtpConfiguration_MailAddress "your@mail.addr"
setx SmtpConfiguration_Password "your_pass"
setx SmtpConfiguration_Port 587
setx SmtpConfiguration_Server "your.smtp.server"
setx SmtpConfiguration_User "user@smtp.server"

setx BingTranslateConfiguration_Key "your_key"

rem runas /env /user:%name% cmd
SET ASPNETCORE_URLS http://*:55300