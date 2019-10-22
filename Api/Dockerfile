ARG port

FROM mcr.microsoft.com/dotnet/core-nightly/sdk AS build
WORKDIR /app/src

COPY ["Api/Api.csproj", "Api/"]
COPY ["CrossCutting.IoC/CrossCutting.IoC.csproj", "CrossCutting.IoC/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["CrossCutting/CrossCutting.csproj", "CrossCutting/"]
COPY ["Infra/CrossCutting.Services.csproj", "Infra/"]
COPY ["Data/Data.csproj", "Data/"]
RUN dotnet restore "Api/Api.csproj"
COPY . ./

RUN dotnet publish "Api/Api.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet
WORKDIR /app

COPY --from=build /app/src/out ./
COPY --from=build /app/src/Data ../Data

EXPOSE 80
ENTRYPOINT ["dotnet", "Api.dll", " "]
