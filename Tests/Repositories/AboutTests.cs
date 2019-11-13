using CrossCutting.IoC;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;

namespace Tests.Repositories
{
	public class  AboutTests
	{
		private ServiceProvider _provider;
		private IAboutRepository _repository;
		private IUnitOfWork _uow;
		private Guid _guid;

		[SetUp]
		public void Setup()
		{
			var services = IocBootStrapper.ConfigureTestServices();

			_provider = services.GetProvider();
			_uow = _provider.GetService<IUnitOfWork>();
			_repository = _provider.GetService<IAboutRepository>();
			var entity = _repository.Add(new  About { });
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

            var currentTitle = entity.Title; 
            entity.Title = "Title";

            var currentImage = entity.Image; 
            entity.Image = "Image";

            var currentDescription = entity.Description; 
            entity.Description = "Description";

			var result = _repository.Update(entity);
			Assert.AreEqual(_guid, entity.Id);
			Assert.AreEqual(_guid, result.Id);

            Assert.AreEqual(result.Title, entity.Title);
            Assert.AreNotEqual(result.Title, currentTitle);

            Assert.AreEqual(result.Image, entity.Image);
            Assert.AreNotEqual(result.Image, currentImage);

            Assert.AreEqual(result.Description, entity.Description);
            Assert.AreNotEqual(result.Description, currentDescription);

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

