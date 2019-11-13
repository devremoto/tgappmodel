using CrossCutting.IoC;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Linq;

namespace Tests.Repositories
{
	public class  ContactTests
	{
		private ServiceProvider _provider;
		private IContactRepository _repository;
		private IUnitOfWork _uow;
		private Guid _guid;

		[SetUp]
		public void Setup()
		{
			var services = IocBootStrapper.ConfigureTestServices();

			_provider = services.GetProvider();
			_uow = _provider.GetService<IUnitOfWork>();
			_repository = _provider.GetService<IContactRepository>();
			var entity = _repository.Add(new  Contact { });
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

            var currentPhoneNumber = entity.PhoneNumber; 
            entity.PhoneNumber = "PhoneNumber";

            var currentEmail = entity.Email; 
            entity.Email = "Email";

            var currentSubject = entity.Subject; 
            entity.Subject = "Subject";

            var currentMessage = entity.Message; 
            entity.Message = "Message";

			var result = _repository.Update(entity);
			Assert.AreEqual(_guid, entity.Id);
			Assert.AreEqual(_guid, result.Id);

            Assert.AreEqual(result.Name, entity.Name);
            Assert.AreNotEqual(result.Name, currentName);

            Assert.AreEqual(result.PhoneNumber, entity.PhoneNumber);
            Assert.AreNotEqual(result.PhoneNumber, currentPhoneNumber);

            Assert.AreEqual(result.Email, entity.Email);
            Assert.AreNotEqual(result.Email, currentEmail);

            Assert.AreEqual(result.Subject, entity.Subject);
            Assert.AreNotEqual(result.Subject, currentSubject);

            Assert.AreEqual(result.Message, entity.Message);
            Assert.AreNotEqual(result.Message, currentMessage);

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

