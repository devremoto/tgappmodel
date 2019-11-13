rmdir /S /Q bin
rmdir /S /Q obj
rem dotnet publish -c Release -r win10-x64 --self-contained
rem dotnet publish -r win-x64 -c Release /p:PublishSingleFile=true /p:PublishTrimmed=true --self-contained
dotnet publish -r win10-x64 -c Release --self-contained