using Application.AutoMapper;
using Application.Interfaces;
using Application.ViewModels.Common;
using CrossCutting.Extensions;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;

namespace Application.Services
{
	public partial class BaseAppService<T> : IBaseAppService<T>
		where T : class
	{
		protected IBaseService<T> _baseService;
		protected IUnitOfWork _uow;

		public BaseAppService(IBaseService<T> service, IUnitOfWork uow)
		{
			_uow = uow;
			_baseService = service;
		}

		public IQueryable<T> Find(Expression<Func<T, bool>> predicate, params string[] includeProperties)
		{
			var model = _baseService.Find(predicate, includeProperties);
			return model;
		}

		public T GetOne(params object[] keys)
		{
			var model = _baseService.GetOne(keys);
			return model;
		}

		public IQueryable<T> GetAll(params string[] includeProperties)
		{
			var model = _baseService.GetAll(includeProperties);
			return model;
		}

		public PagingViewModel<T> GetByAllPage(PagingViewModel<T> page, params string[] includeProperties)
		{
			try
			{
				var model = _baseService.GetAll(includeProperties).Paging(page.Number, page.Size, page.OrderBy, page.OrderDirection);

				page.List = model.Item1.ToList();
				page.TotalCount = model.Item2;
				return page;
			}
			catch (Exception e)
			{

				throw e;
			}
		}

		public T Add(T model)
		{
			var result = _baseService.Add(model);
			_uow.Commit();
			return result;
		}

		public T Update(T model)
		{
			var result = _baseService.Update(model);
			_uow.Commit();
			return result;
		}

		public T Save(T model, bool edit)
		{
			T result;
			if (edit)
			{
				result = _baseService.Update(model);
			}
			else
			{
				result =_baseService.Add(model);
			}
			_uow.Commit();
			return result;
		}

		public void Remove(T model)
		{
			_baseService.Remove(model);
			_uow.Commit();
		}

		public void Remove(params object[] key)
		{
			_baseService.Remove(key);
			_uow.Commit();
		}

		public void Dispose()
		{
			_uow.Dispose();
		}

		public void SaveJson()
		{
			var dir = JsonFolder();

			var content = _baseService.GetAll().JsonSerialize();
			File.WriteAllText(Path.Combine(dir, "db.json"), content);
		}

		private string JsonFolder()
		{
			var name = typeof(T).Name;
			var path = AppContext.BaseDirectory;
			var dir = Path.Combine(path, name);
			Directory.CreateDirectory(dir);
			return dir;
		}

		public List<T> GetJson(int hours = 24)
		{
			var dir = JsonFolder();
			var file = Path.Combine(dir, "db.json");
			var exists = File.Exists(file);
			var expired = false;
			if (exists)
			{
				var info = new FileInfo(file);
				expired = (info.LastWriteTime.ToUniversalTime() <= DateTime.UtcNow.AddHours(hours));
			}

			if (!exists || expired)
			{
				SaveJson();
			}
			var result = File.ReadAllText(file);
			return result.JsonDeserialize<List<T>>();
		}
	}

}
