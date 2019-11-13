using CrossCutting.IoC;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;

namespace Tests.Repositories
{
	public class  LanguageTests
	{
		private ServiceProvider _provider;
		private ILanguageRepository _repository;
		private IUnitOfWork _uow;
		private Guid _guid;

		[SetUp]
		public void Setup()
		{
			var services = IocBootStrapper.ConfigureTestServices();

			_provider = services.GetProvider();
			_uow = _provider.GetService<IUnitOfWork>();
			_repository = _provider.GetService<ILanguageRepository>();
			var entity = _repository.Add(new  Language { });
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

            var currentCode = entity.Code; 
            entity.Code = "Code";

            var currentName = entity.Name; 
            entity.Name = "Name";

            var currentImage = entity.Image; 
            entity.Image = "Image";

            var currentActive = entity.Active; 
            entity.Active = !entity.Active;

            var currentDefault = entity.Default; 
            entity.Default = !entity.Default;

            var currentLoaded = entity.Loaded; 
            entity.Loaded = !entity.Loaded;

			var result = _repository.Update(entity);
			Assert.AreEqual(_guid, entity.Id);
			Assert.AreEqual(_guid, result.Id);

            Assert.AreEqual(result.Code, entity.Code);
            Assert.AreNotEqual(result.Code, currentCode);

            Assert.AreEqual(result.Name, entity.Name);
            Assert.AreNotEqual(result.Name, currentName);

            Assert.AreEqual(result.Image, entity.Image);
            Assert.AreNotEqual(result.Image, currentImage);

            Assert.AreEqual(result.Active, entity.Active);
            Assert.AreNotEqual(result.Active, currentActive);

            Assert.AreEqual(result.Default, entity.Default);
            Assert.AreNotEqual(result.Default, currentDefault);

            Assert.AreEqual(result.Loaded, entity.Loaded);
            Assert.AreNotEqual(result.Loaded, currentLoaded);

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

