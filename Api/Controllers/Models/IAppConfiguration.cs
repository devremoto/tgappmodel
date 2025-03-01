namespace Api.Models;

public interface IAppModelConfiguration
{
    string Authority { get; set; }
    string ImgFolder { get; set; }
    bool RequireHttpsMetadata { get; set; }
    string ApiName { get; }
}