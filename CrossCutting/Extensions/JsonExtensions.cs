using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Xml;
using System.IO;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Converters;

namespace CrossCutting.Extensions
{
	public static class JsonExtensions
	{

		#region JSON

		#region JSON and XML

		public static JArray ToCustomJson<T>(this List<T> list, string[] names = null, string[] custom = null)
		{

			try
			{
				PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
				var rows = new List<string>();
				var tpl = "'{0}' : '{1}'";
				foreach (T item in list)
				{
					var cells = new List<string>();
					var i = 0;
					foreach (PropertyDescriptor prop in properties)
					{

						object value = "";
						var attrs = prop.Attributes.Cast<Attribute>().ToList();
						var isClass = ((prop.PropertyType.Namespace.Contains("Domain") && !prop.PropertyType.IsEnum) || prop.PropertyType.Namespace.Contains("List") || prop.PropertyType.Namespace.Contains("Collections"));
						if (!isClass && attrs != null && !attrs.Select(x => x.ToString()).Any(z => z.Contains("NotMapped")))
						{
							if (names != null && names.Count() > 0)
							{
								var name = prop.Name;
								if (names.Contains(prop.Name))
								{
									if (custom != null)
									{
										name = custom[Array.IndexOf(names, prop.Name)];
									}
									value = prop.GetValue(item);
									cells.Add(value != null ? string.Format(tpl, name, value.ToString().Replace(@"
", "\n").Trim()) : string.Format(tpl, prop.Name, string.Empty));
									i++;
								}
							}
							else
							{
								cells.Add(value != null ? string.Format(tpl, prop.Name, value.ToString().Replace(@"
", "\n").Trim()) : string.Format(tpl, prop.Name, string.Empty));
							}
						}
					}
					rows.Add("{" + string.Join(",", cells.Select(x => x.ToString()).ToArray()) + "}");
				}


				var json = string.Format("[{0}]", string.Join(",", rows));
				return JArray.Parse(json);
			}
			catch (Exception e)
			{

				throw e;
			}
		}

		public static string JsonToXml(this string json)
		{
			XmlDocument doc = JsonConvert.DeserializeXmlNode(json);

			var result = doc.AsString();
			//return result.Replace(">", ">\n");
			return result;
		}
		public static string XmlToJson(this string xml)
		{
			XmlDocument doc = new XmlDocument();
			doc.LoadXml(xml);

			string json = JsonConvert.SerializeXmlNode(doc, Newtonsoft.Json.Formatting.Indented);
			return json;
		}
		#endregion

		#region serializations 

		public static string JsonSerialize(this object obj, bool convertEnum = false)
		{
			if (obj != null)
			{

				var settings = new JsonSerializerSettings
				{
					Formatting = Newtonsoft.Json.Formatting.Indented,
					ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
					NullValueHandling = NullValueHandling.Ignore,

				};
				if (convertEnum)
				{
					settings.Converters.Add(new StringEnumConverter());
				}

				return JsonConvert.SerializeObject(obj, settings);
			}
			return "";
		}

		public static T JsonDeserialize<T>(this object obj)
		{
			if (obj != null)
				return (T)JsonConvert.DeserializeObject<T>(obj.ToString());
			return default(T);
		}

		public static T JsonDeserialize<T>(this string obj)
		{
			if (obj != null)
				return (T)JsonConvert.DeserializeObject<T>(obj);
			return default(T);
		}

		public static dynamic JsonToDynamic(this string obj)
		{
			if (!string.IsNullOrWhiteSpace(obj))
				return ((dynamic)JObject.Parse(obj));
			return null;
		}

		public static dynamic JsonToDynamic(this object obj)
		{
			if (obj != null)
			{
				var result = JObject.Parse(obj.ToString());
				var result2 = ((dynamic)((Newtonsoft.Json.Linq.JObject)(result)));
				return result2;
			}
			return null;
		}

		public static object JsonObjectCamelCase(this object data)
		{
			var jsonSerializerSettings = new JsonSerializerSettings
			{
				NullValueHandling = NullValueHandling.Ignore,
				Formatting = Newtonsoft.Json.Formatting.Indented,
				ContractResolver = new CamelCasePropertyNamesContractResolver(),
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
			};
			var strJson = JsonConvert.SerializeObject(data, jsonSerializerSettings);
			var result = JsonConvert.DeserializeObject(strJson);
			return result;
		}
		#endregion

		#region deserialization
		public static JObject ToJObject(this string obj)
		{
			if (!string.IsNullOrWhiteSpace(obj))
				return JObject.Parse(obj);
			return null;
		}

		public static JObject ToJObject(this object obj)
		{
			if (obj != null)
			{
				var result = JObject.Parse(obj.ToString());
				return result;
			}
			return null;
		}

		#endregion

		#endregion JSON
		public static StringContent ToJsonStringContent<T>(this T obj)
		{
			var content = new StringContent(obj.JsonSerialize(), Encoding.UTF8, "application/json");
			return content;
		}

	}
}
