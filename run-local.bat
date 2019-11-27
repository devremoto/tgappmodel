@echo off
del Data\DB\appDBModel.db
call env.bat
title=RUN LOCAL
if %USE_ENV% == true (
start cmd /c "cd Web & ng serve --aot -o --host %HOST_IP% --port=%HOST_PORT% --configuration=dev" 
) else (
    start cmd /c "cd Web & ng serve --aot -o --host %HOST_IP% --port=%HOST_PORT%" 
)
start cmd /c "title=back & cd Api & dotnet build & dotnet watch run --urls http://+:%API_PORT% seed"

goto comment
call env.bat
cd Web & ng serve --aot -o --host %HOST_IP% --port=%HOST_PORT% --configuration=dev

:comment