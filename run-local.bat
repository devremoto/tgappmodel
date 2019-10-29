@echo off
call pre.bat
title=RUN LOCAL
start cmd /c "cd %~dp0/Web & title=front & ng serve -o --port=%HOST_PORT% --configuration=dev" 
start cmd /c "title=back & cd %~dp0/Api & dotnet build & dotnet run seed"
