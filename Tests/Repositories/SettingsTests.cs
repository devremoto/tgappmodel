using CrossCutting.IoC;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;

namespace Tests.Repositories
{
	public class  SettingsTests
	{
		private ServiceProvider _provider;
		private ISettingsRepository _repository;
		private IUnitOfWork _uow;
		private Guid _guid;

		[SetUp]
		public void Setup()
		{
			var services = IocBootStrapper.ConfigureTestServices();

			_provider = services.GetProvider();
			_uow = _provider.GetService<IUnitOfWork>();
			_repository = _provider.GetService<ISettingsRepository>();
			var entity = _repository.Add(new  Settings { });
			_uow.Commit();
			_guid = entity.Id;
		}

		[Test]
		public void GetOne()
		{
			var entity = _repository.GetOne(_guid);
			Assert.AreEqual(_guid, entity.Id);
		}


		[Test]
		public void Remove()
		{
			var entity = _repository.GetOne(_guid);
			Assert.IsNotNull(entity);
			_repository.Remove(entity);
			_uow.Commit();
			entity = _repository.GetOne(_guid);
			Assert.IsNull(entity);
		}

		[Test]
		public void List()
		{
			var list = _repository.GetAll();
			var count = list.Count();
			Assert.IsTrue(count > 0, $"count = {count}");
			Assert.IsTrue(count == 1, $"count = {count}");
		}

		[Test]
		public void Update()
		{
			var entity = _repository.GetOne(_guid);

            var currentKey = entity.Key; 
            entity.Key = "Key";

            var currentValue = entity.Value; 
            entity.Value = "Value";

			var result = _repository.Update(entity);
			Assert.AreEqual(_guid, entity.Id);
			Assert.AreEqual(_guid, result.Id);

            Assert.AreEqual(result.Key, entity.Key);
            Assert.AreNotEqual(result.Key, currentKey);

            Assert.AreEqual(result.Value, entity.Value);
            Assert.AreNotEqual(result.Value, currentValue);

		}

		[Test]
		public void Find()
		{
			var entity = _repository.Find(x => x.Id == _guid);
			Assert.IsNotNull(entity);
		}

		[TearDown]
		public void Cleanup()
		{
			_repository.Remove(_guid);      
			_uow.Commit();
		}

	}
}

