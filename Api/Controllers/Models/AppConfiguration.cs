namespace Api.Models
{
    public class AppModelConfiguration : IAppModelConfiguration
    {
        public string ImgFolder { get; set; }
        public string Authority { get; set; }
        public bool UseAuthority { get; set; }
        public bool RequireHttpsMetadata { get; set; }
        public string ApiName { get; set; }
        public string[] CorsOrigins { get; set; } = new[] { "http://localhost:4200" };
        public string ClientId { get; set; }
		public DbType DbType { get; set; } = DbType.SQLITE;
	}

	public enum DbType{
		SQLITE,
		SQLSERVER,
		MEMORY,
	}
}
