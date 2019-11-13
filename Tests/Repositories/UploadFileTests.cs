using CrossCutting.IoC;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;

namespace Tests.Repositories
{
	public class  UploadFileTests
	{
		private ServiceProvider _provider;
		private IUploadFileRepository _repository;
		private IUnitOfWork _uow;
		private Guid _guid;

		[SetUp]
		public void Setup()
		{
			var services = IocBootStrapper.ConfigureTestServices();

			_provider = services.GetProvider();
			_uow = _provider.GetService<IUnitOfWork>();
			_repository = _provider.GetService<IUploadFileRepository>();
			var entity = _repository.Add(new  UploadFile { });
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

            var currentName = entity.Name; 
            entity.Name = "Name";

            var currentInputFileField = entity.InputFileField; 
            entity.InputFileField = "InputFileField";

            var currentSize = entity.Size; 
            entity.Size += 1;

            var currentType = entity.Type; 
            entity.Type = "Type";

            var currentFileName = entity.FileName; 
            entity.FileName = "FileName";

            var currentController = entity.Controller; 
            entity.Controller = "Controller";

            var currentExtension = entity.Extension; 
            entity.Extension = "Extension";

			var result = _repository.Update(entity);
			Assert.AreEqual(_guid, entity.Id);
			Assert.AreEqual(_guid, result.Id);

            Assert.AreEqual(result.Name, entity.Name);
            Assert.AreNotEqual(result.Name, currentName);

            Assert.AreEqual(result.InputFileField, entity.InputFileField);
            Assert.AreNotEqual(result.InputFileField, currentInputFileField);

            Assert.AreEqual(result.Size, entity.Size);
            Assert.AreNotEqual(result.Size, currentSize);

            Assert.AreEqual(result.Type, entity.Type);
            Assert.AreNotEqual(result.Type, currentType);

            Assert.AreEqual(result.FileName, entity.FileName);
            Assert.AreNotEqual(result.FileName, currentFileName);

            Assert.AreEqual(result.Controller, entity.Controller);
            Assert.AreNotEqual(result.Controller, currentController);

            Assert.AreEqual(result.Extension, entity.Extension);
            Assert.AreNotEqual(result.Extension, currentExtension);

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

