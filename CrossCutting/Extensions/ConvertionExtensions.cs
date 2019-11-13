using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace CrossCutting.Extensions
{
	public static class ConvertionExtensions
	{
		#region CONVERTIONS
		public static string ToCSV<T>(this List<T> list, bool propNamAsHeader = true, params string[] names)
		{

			return list.ToCSV(";", "\"", propNamAsHeader, names);
		}

		public static string ToCSV<T>(this List<T> list, params string[] names)
		{
			return list.ToCSV(";", "\"", true, names);
		}

		public static string ToCSV<T>(this List<T> list, string[] names, string[] custom)
		{
			return list.ToCSV(";", "\"", true, names, custom);
		}

		public static string ToCSV<T>(this List<T> list, string separator = ";", string enclosedBy = "\"", string[] names = null, string[] custom = null)
		{
			return list.ToCSV(separator, enclosedBy, true, names, custom);
		}

		public static string ToCSV<T>(this List<T> list, string separator = ";", string enclosedBy = "\"", bool propNamAsHeader = true, string[] names = null, string[] custom = null)
		{
			list = list ?? new List<T>();
			PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
			var rows = new List<string>();
			foreach (T item in list)
			{
				var cells = new List<string>();
				foreach (PropertyDescriptor prop in properties)
				{
					object value = "";
					var attrs = prop.Attributes.Cast<Attribute>().ToList();
					var isClass = (prop.PropertyType.Namespace.Contains("Domain") && !prop.PropertyType.IsEnum) || prop.PropertyType.Namespace.Contains("List") || prop.PropertyType.Namespace.Contains("Collections");
					if (!isClass && attrs != null && !attrs.Select(x => x.ToString()).Any(z => z.Contains("NotMapped")))
					{
						if (names != null && names.Length > 0)
						{
							if (names.Contains(prop.Name))
							{
								value = prop.GetValue(item);
								cells.Add(value != null ? $"{enclosedBy}{value.ToString()}{enclosedBy}" : string.Empty);
							}
						}
						else
						{
							cells.Add(value != null ? $"{enclosedBy}{value.ToString()}{enclosedBy}" : string.Empty);
						}
					}
				}
				rows.Add(string.Join(separator, cells.Select(x => $"{x.ToArray()}\r\n")));
			}


			if (propNamAsHeader)
			{
				var header = "";
				List<string> props = new List<string>();

				foreach (PropertyDescriptor prop in properties)
				{
					var attrs = prop.Attributes.Cast<Attribute>().ToList();
					bool isClass = (prop.PropertyType.Namespace.Contains("Domain") && !prop.PropertyType.IsEnum)
						|| prop.PropertyType.Namespace.Contains("List")
						|| prop.PropertyType.Namespace.Contains("Collections");
					if (!isClass && attrs != null && !attrs.Select(x => x.ToString()).Any(z => z.Contains("NotMapped")))
					{
						if ((bool)names?.Contains(prop.Name))
						{
							var name = custom != null ? custom[Array.IndexOf(names, prop.Name)] : prop.Name;
							props.Add($"{enclosedBy}{prop.Name}{enclosedBy}");
						}
						else
						{
							props.Add($"{enclosedBy}{prop.Name}{enclosedBy}");
						}

					}


					header = string.Join(separator, props.Select(x => x.ToString(CultureInfo.InvariantCulture)).ToArray()) + "\r\n";
				}
				rows.Insert(0, header);
				return string.Join("", rows);
			}

			return string.Join("", rows);
		}

		public static string ConvertEnconding(this string value, Encoding from, Encoding to)
		{
			var b = Encoding.Convert(from, to, to?.GetBytes(value));
			return to.GetString(b);
		}

		public static Stream ToStream(this string contents, Encoding encoding = null)
		{
			if (encoding == null)
				encoding = Encoding.Default;
			MemoryStream stream = new MemoryStream(contents.ToBytes(encoding));
			return stream;
		}

		public static Stream ToStream(this byte[] contents)
		{
			MemoryStream stream = new MemoryStream(contents);
			return stream;
		}

		public static byte[] ToBytes(this string contents, Encoding encoding = null)
		{
			if (encoding == null)
				encoding = Encoding.Default;
			return encoding.GetBytes(contents);
		}

		public static string ToBase64(this string contents, Encoding encoding = null)
		{
			if (encoding == null)
				encoding = Encoding.Default;
			var bytes = encoding.GetBytes(contents);
			return Convert.ToBase64String(bytes);
		}
		public static DataTable ToDataTable<T>(this List<T> list)
		{
			list = list ?? new List<T>();
			PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
			DataTable table = new DataTable
			{
				TableName = typeof(T).Name
			};

			foreach (PropertyDescriptor prop in properties)
			{
				table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
			}

			foreach (T item in list)
			{
				DataRow row = table.NewRow();
				foreach (PropertyDescriptor prop in properties)
				{
					row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
				}
				table.Rows.Add(row);
			}
			return table;
		}

		public static DataTable ToDataTable<T>(this T source)
		{
			PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
			DataTable table = new DataTable
			{
				TableName = typeof(T).Name
			};

			foreach (PropertyDescriptor prop in properties)
			{
				table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
			}

			DataRow row = table.NewRow();
			foreach (PropertyDescriptor prop in properties)
			{
				row[prop.Name] = prop.GetValue(source) ?? DBNull.Value;
			}

			table.Rows.Add(row);
			return table;
		}

		public static TResult To<TResult>(this object source)
		{
			if (source != null && source != DBNull.Value && source != System.DBNull.Value && !string.IsNullOrWhiteSpace(source.ToString()))
			{
				var type = typeof(TResult);
				if (type.Name.Contains("Nullable"))
				{
					try
					{
						var typeName = type.FullName.Replace("System.Nullable`1[[", "").Split(',')[0];
						var result = (TResult)Convert.ChangeType(source, Type.GetType(typeName), CultureInfo.InvariantCulture);
						return result;

					}
					catch
					{
						return default;
					}
				}

				return (TResult)Convert.ChangeType(source, typeof(TResult), CultureInfo.InvariantCulture);
			}

			return default;
		}

		public static TResult To<TResult>(this Guid source)
		{
			if (source != null && !string.IsNullOrWhiteSpace(source.ToString()))
			{
				return (TResult)TypeDescriptor.GetConverter(typeof(TResult)).ConvertFromInvariantString(source.ToString());
			}
			return default;
		}

		public static List<string> ToStringList<T>(this Enum source)
		{
			if (source == null)
				return default;

			return Enum.GetNames(typeof(T)).ToList();
		}

		public static List<int> ToIntList<T>(this Enum source)
		{
			List<int> result = new List<int>();
			foreach (var item in Enum.GetValues(typeof(T)))
			{
				result.Add((int)item);
			}

			return result;
		}

		public static List<object> ToObjectList(this Enum source)
		{
			List<object> list = new List<object>();
			foreach (var item in Enum.GetValues(source?.GetType()))
			{
				var objItem = new { Id = (int)item, Name = item.ToString().ToUpper(CultureInfo.InvariantCulture) };
				list.Add(objItem);
			}

			return list;
		}

		public static Dictionary<int, string> ToDictionary(this Enum source)
		{
			Dictionary<int, string> result = new Dictionary<int, string>();
			foreach (var item in Enum.GetValues(source?.GetType()))
			{
				result.Add((int)item, item.ToString());
			}

			return result;
		}
		#endregion
	}
}
