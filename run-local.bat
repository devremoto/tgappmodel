@echo off
call pre.bat
title=RUN LOCAL
start cmd /c "title=PRE BUILD & call env.bat & exit"
if %USE_ENV% == true (
start cmd /c "cd %~dp0/Web & ng serve --aot -o --host %HOST_IP% --port=%HOST_PORT% --configuration=dev" 
) else (
    start cmd /c "cd %~dp0/Web & ng serve --aot -o --host %HOST_IP% --port=%HOST_PORT%" 
)
start cmd /c "title=back & cd %~dp0/Api & dotnet build & dotnet watch run seed"
