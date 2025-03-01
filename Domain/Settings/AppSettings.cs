namespace Domain;


public class AppSettings
{
    public static string SECTION = "AppModelConfiguration";
    public string Root { get; set; }
    public Cors Cors { get; set; }
    public bool EnableSensitiveDataLogging { get; set; }
    public ConnectionStrings ConnectionStrings { get; set; }
    public string Authority { get; set; }
    public string ApiName { get; set; }
    public bool RequireHttpsMetadata { get; set; }
    public bool UseAuthority { get; set; }
    public string Secret { get; set; }
    public string ClientId { get; set; }

    public DbType DbType { get; set; }
    public string ImageFolder { get; set; }
    public string SiteUrl { get; set; }
}

public class ConnectionStrings
{
    public string MySql { get; set; }
    public string Sql { get; set; }
    public string Sqlite { get; set; }
    public string InMemory { get; set; }
    public string PostgreSql { get; set; }
}

public class Cors
{
    public string[] Origins { get; set; } = ["http://localhost:4200"];
}

public enum DbType
{
    MYSQL,
    SQL,
    SQLLITE,
    INMEMORY,
    POSTGRESQL,
}
