using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace CrossCutting.Extensions
{
	public static class LinqExtensions
	{
		#region LINQ
		public static Tuple<IQueryable<T>, int> Paging<T, TKEY>(this IQueryable<T> source, int? page = 1, int? pageSize = 50, string orderBy = null, string orderDirection = "ASC")
		{
			return Paging(source, page, pageSize, orderBy, orderDirection);
		}

		public static Tuple<IQueryable<T>, int> Paging<T>(this IEnumerable<T> source, int? page = 1, int? pageSize = 50, string orderBy = null, string orderDirection = "ASC")
		{
			int size = pageSize.Value;

			var skip = ((int)page - 1) * size;

			if (orderBy != null)
				return new Tuple<IQueryable<T>, int>(source.AsQueryable().OrderBy($"{orderBy} {orderDirection}").Skip(skip).Take(size).AsQueryable(), source.Count());
			else
				return new Tuple<IQueryable<T>, int>(source.Skip(skip).Take(size).AsQueryable(), source.Count());
		}

		#endregion
	}
}
