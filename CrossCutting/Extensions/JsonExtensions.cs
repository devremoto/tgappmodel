
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;

namespace CrossCutting.Extensions;

public static class JsonExtensions
{

    #region JSON

    #region JSON and XML

    public static JsonDocument ToCustomJson<T>(this List<T> list, string[] names = null, string[] custom = null)
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
                    if (names != null && names.Length > 0)
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
        return JsonDocument.Parse(json);

    }

    public static string JsonToXml(this string json)
    {
        JsonDocument jsonDoc = JsonDocument.Parse(json);
        return jsonDoc.ToXml();
    }
    public static string XmlToJson(this string xml)
    {
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(xml);

        string json = JsonSerializer.Serialize(doc);
        return json;
    }
    #endregion

    #region serializations 

    public static string JsonSerialize(this object obj, bool convertEnum = false)
    {
        if (obj != null)
        {

            var settings = new JsonSerializerOptions
            {

                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReferenceHandler = ReferenceHandler.IgnoreCycles

            };
            if (convertEnum)
            {
                settings.Converters.Add(new JsonStringEnumConverter());
            }

            return JsonSerializer.Serialize(obj, settings);
        }
        return "";
    }

    public static string JsonSerialize<T>(this T obj, bool convertEnum = false)
    {
        if (obj != null)
        {

            var settings = new JsonSerializerOptions
            {

                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReferenceHandler = ReferenceHandler.IgnoreCycles

            };
            if (convertEnum)
            {
                settings.Converters.Add(new JsonStringEnumConverter());
            }

            return JsonSerializer.Serialize<T>(obj, settings);
        }
        return "";
    }

    public static T JsonDeserialize<T>(this object obj)
    {
        if (obj != null)
            return (T)JsonSerializer.Deserialize<T>(obj.ToString());
        return default(T);
    }

    public static T JsonDeserialize<T>(this string obj)
    {
        if (!string.IsNullOrWhiteSpace(obj))
            return (T)JsonSerializer.Deserialize<T>(obj);
        return default(T);
    }

    public static dynamic JsonToDynamic(this string obj)
    {
        if (!string.IsNullOrWhiteSpace(obj))
        {
            var result = ((dynamic)JsonSerializer.Deserialize(obj, typeof(object)));
            return result;
        }
        return null;
    }

    public static dynamic JsonToDynamic(this object obj)
    {
        if (obj != null)
        {
            var result = ((dynamic)JsonSerializer.Deserialize(obj.ToString(), typeof(object)));
            return result;
        }
        return null;
    }

    public static object JsonObjectCamelCase(this object data)
    {
        var json = data.JsonSerialize();
        var result = json.JsonToDynamic();
        return result;
    }
    #endregion

    #region deserialization
    public static JsonDocument ToJObject(this string obj)
    {
        if (!string.IsNullOrWhiteSpace(obj))
        {
            var result = JsonDocument.Parse(obj);
            return result;
        }
        return null;
    }

    public static JsonDocument ToJObject(this object obj)
    {
        if (obj != null)
        {
            var result = JsonDocument.Parse(obj.ToString());
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
