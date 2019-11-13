using Data.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Api.Models;
using CrossCutting.IoC;

namespace Api.Helpers
{
	public static class DbHelper
	{

		public static  IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration, AppModelConfiguration settings) =>
		 settings.DbType switch
		 {
			 DbType.MEMORY => services.AddSqlInMemory(configuration),
			 DbType.SQLSERVER => services.AddSqlite(configuration),
			 _ => services.AddSqlite(configuration)
		 };
	}
}
