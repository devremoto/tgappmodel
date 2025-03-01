
using System.Net.Http;
using System.Threading.Tasks;

namespace CrossCutting.Services.Zip;

public class ZipCodeBr : IZipCode
{
    public string Json(string code)
    {
        return Get(code).Result;
    }

    private static Task<string> Get(string code)
    {
        using var client = new HttpClient();
        return client.GetStringAsync($"https://viacep.com.br/ws/{code}/json/");
    }
}
