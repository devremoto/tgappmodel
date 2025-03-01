@echo off
set PORT=4200
rem env.bat
title=RUN LOCAL
start cmd /c "cd %~dp0/Web & npm i & title=front & ng serve -o --port=%PORT% --configuration=development & title=front " 
start cmd /c "title=back & cd %~dp0/Api & dotnet build & dotnet publish & dotnet run seed dotnet run --server.urls http://0.0.0.0:52050 & pause"
