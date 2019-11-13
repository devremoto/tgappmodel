using CrossCutting.IoC;
using Data.EF;
using Data.UoW;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;

namespace Tests
{
	public class Tests:IDisposable
	{
		private ServiceProvider _provider;
		private AppDbContext _context;

		[SetUp]
		public void Setup()
		{
			var services = IocBootStrapper.ConfigureTestServices();		
			
			_provider = services.GetProvider();
			_context = _provider.GetService<AppDbContext>();
			_context.EnsureSeedDataForContext();
		}

		[Test]
		public void CheckPopulateSocialNetwork()
		{
			var rep = _provider.GetService<ISocialNetworkRepository>();
			var result = rep.GetAll();
			Assert.IsTrue(result.Count() > 0);
		}

		[Test]
		public void CheckPopulateLanguage()
		{
			var rep = _provider.GetService<ILanguageRepository>();
			var result = rep.GetAll();
			Assert.IsTrue(result.Count() > 0);			
		}

		public void Dispose()
		{
			//_context.Dispose();
		}
	}
}