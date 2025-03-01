using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;

namespace CrossCutting;


public class ClassManager
{

    static ClassManager _instance;
    public static ClassManager Instance
    {
        get
        {
            if (_instance == null)
                _instance = new ClassManager();
            return _instance;
        }
    }
    public string Directory { get; set; }

    private ClassManager()
    {
        //Classes = GetClasses();
    }
    public List<ClassModel> Classes { get; set; }
    bool DoesFileExist(string filename)
    {
        return File.Exists(Path.Combine(Directory, filename));
    }
    // Get current  folder directory
    string GetCurrentDirectory()
    {
        return Directory;//System.IO.Path.GetDirectoryName(Host.TemplateFile);
    }

    void CreateDirectory(string path)
    {
        if (!System.IO.Directory.Exists(path))
            System.IO.Directory.CreateDirectory(Directory + path);
    }

    public List<ClassModel> GetClasses()
    {
        var classes = Load().Classes.OrderBy(u => u.Name).ToList();
        return classes;
    }

    public IEnumerable<TSource> DistinctBy<TSource, TKey>
    (IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
    {
        HashSet<TKey> seenKeys = new HashSet<TKey>();
        foreach (TSource element in source)
        {
            if (seenKeys.Add(keySelector(element)))
            {
                yield return element;
            }
        }
    }


    public void AddClass(ClassModel classModel)
    {
        if (Classes == null)
            Classes = new List<ClassModel>();
        Classes.Add(classModel);
    }

    public string ToCamelCase(String str)
    {
        return Char.ToLowerInvariant(str[0]) + str.Substring(1);
    }

    public String ToUnderscore(String input)
    {
        string pattern = "([a-z])([A-Z]+)";
        string replacement = "$1_$2";
        Regex rgx = new Regex(pattern);
        var result = rgx.Replace(input, replacement);
        return result;
    }

    public String ToDash(String input)
    {
        string pattern = "([a-z])([A-Z]+)";
        string replacement = "$1-$2";
        Regex rgx = new Regex(pattern);
        var result = rgx.Replace(input, replacement);
        return result.ToLower();
    }

    public String ToSpacedName(String input)
    {
        string pattern = "([a-z])([A-Z]+)";
        string replacement = "$1 $2";
        Regex rgx = new Regex(pattern);
        var result = rgx.Replace(input, replacement);
        return result;
    }


    public ClassManager Load(bool orderFields = false)
    {
        var path = $"{Directory}/Templates/";
        var models = Assembly.LoadFile($"{path}Domain.dll");

        //Assembly models = Assembly.GetAssembly(typeof(Domain.Entities.Contact));
        //Assembly models = Assembly.LoadFile("C:\\desenvolvimento\\c#\\SorrisoChic\\SorrisoChic\\templates\\Domain.dll");
        var types = models.GetTypes();


        types = types.Where(x => x.FullName.Contains("Domain.Entities") && x.Name != "Secret" && x.Name != "UserClaim").OrderBy(x => x.Name).ToArray();
        GC.SuppressFinalize(models);
        models = null;

        foreach (Type type in types)
        {
            if ((type.IsClass || type.IsInterface) && !type.IsAbstract)
            {
                var classModel = new ClassModel()
                {
                    Name = type.Name,
                    IsSubClass = type.BaseType.FullName.Contains("Domain.Entities"),
                };
                //BindingFlags.DeclaredOnly |
                var props = type.GetProperties(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static).ToList();
                if (props != null && props.Count > 0)
                {
                    if (orderFields)
                        props = props.OrderBy(x => x.Name).ToList();

                    foreach (var prop in props)
                    {
                        var attrs = prop.GetCustomAttributes(true);

                        var field = new Field()
                        {
                            Name = prop.Name,
                            DataType = (prop.PropertyType.Name.Contains("Null")) ? string.Format("{0}?", Nullable.GetUnderlyingType(prop.PropertyType).ToString().Replace("System.", "")) : prop.PropertyType.Name,
                            SqlType = ConvertSql(prop.PropertyType.Name),
                            IsEnum = prop.PropertyType.IsEnum,
                            IsClass = (prop.PropertyType.Namespace.Contains("Domain") && !prop.PropertyType.IsEnum) || prop.PropertyType.Namespace.Contains("List") || prop.PropertyType.Namespace.Contains("Generic") || prop.PropertyType.Namespace.Contains("Collection"),
                            IsNotMapped = (attrs != null && attrs.Select(x => x.ToString()).Any(z => z.Contains("NotMapped"))),
                        };

                        if (prop.PropertyType.IsGenericType && (prop.PropertyType.GetGenericTypeDefinition() == typeof(List<>) || prop.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>)))
                        {
                            field.DataType = prop.PropertyType.GetGenericArguments()[0].ToString().Split('.')?.Last()?.Replace("]", "");
                            if (field.DataType == "String")
                            {
                                field.DataType = field.DataType.ToLower();
                                field.IsClass = false;
                            }
                            field.IsCollection = field.DataType != "string";
                        }

                        if (field.IsClass && !prop.PropertyType.Namespace.Contains("Generic") && !prop.PropertyType.Namespace.Contains("Collection") && !prop.PropertyType.Namespace.Contains("List"))
                            field.IsParent = true;

                        SetHtmlType(field);

                        classModel.AddField(field);
                    }
                }
                AddClass(classModel);
            }
        }
        return this;
    }

    public string ConvertSql(string name)
    {
        var result = name;
        switch (name.ToLower())
        {
            case "string":
                result = "nvarchar(max)";
                break;
            case "nullable`1":
                result = "decimal(18,2)";
                break;
            case "int32":
                result = "INT";
                break;
        }
        return result;
    }

    public void SetHtmlType(Field field)
    {
        var dataType = field.DataType.ToLower().Trim();
        var name = field.Name.ToLower().Trim();
        field.HtmlType = "text";

        if (field.IsParent)
        {
            field.HtmlType = "select";
            return;
        }

        if (dataType.Contains("bool"))
        {
            field.HtmlType = "checkbox";
            return;
        }

        if (
            name.Contains("description") ||
            name.Contains("content") ||
            name.Contains("descricao") ||
            name.EndsWith("text") ||
            name.StartsWith("text")
        )
        {
            field.HtmlType = "textarea";
            return;
        }

        if (
            name.Contains("date") ||
            dataType.Contains("date")
        )
        {
            field.HtmlType = "date";
            return;
        }

        if (
            name.Contains("image") ||
            name.Contains("photo") ||
            name.Contains("picture") ||
            name.Contains("file")
        )
        {
            field.HtmlType = "file";
            return;
        }

        if (
            name.Contains("hour") ||
            name.Contains("datetime") ||
            name.StartsWith("date") ||
            name.EndsWith("date")
        )
        {
            field.HtmlType = "datetime";
            return;
        }

        if (
            name.StartsWith("url") ||
            name.EndsWith("url")
        )
        {
            field.HtmlType = "url";
            return;
        }

        if (
            name.StartsWith("email") ||
            name.EndsWith("email")
        )
        {
            field.HtmlType = "email";
            return;
        }

    }

}

public class ClassModel
{
    public ClassModel()
    {
        Fields = new List<Field>();
    }

    public List<Field> FileFields()
    {
        return Fields.Where(x => x.HtmlType == "file").ToList();
    }

    public String Name { get; set; }
    public bool IsSubClass { get; set; }
    public List<Field> Fields { get; set; }
    public void AddField(Field field)
    {
        if (Fields == null)
            Fields = new List<Field>();
        Fields.Add(field);
    }

}

public class Field
{
    public String Name { get; set; }
    public String DataType { get; set; }
    public String SqlType { get; set; }
    public String HtmlType { get; set; }
    public bool IsClass { get; set; }
    public bool IsEnum { get; set; }
    public bool IsCollection { get; set; }
    public bool IsParent { get; set; }
    public bool IsNotMapped { get; set; }
}
