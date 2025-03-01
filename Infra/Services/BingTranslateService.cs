using CrossCutting.Services.Configuration;
using System;
using System.Net.Http;
using System.Runtime.Caching;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CrossCutting.Services.Services;

public class BingTranslateService(BingTranslateConfiguration configuration) : ITranslateService
{
    readonly BingTranslateConfiguration _configuration = configuration;


    /// Url template to make translate call
    private const string TranslateUrlTemplate = "http://Api.microsofttranslator.com/v2/http.svc/translate?text={0}&from={1}&to={2}&category={3}";

    private readonly MemoryCache _cache = MemoryCache.Default;

    public string Translate(string text, string from, string to)
    {
        var result = TranslateAsync(text, from, to).Result.ToString();
        return result;
    }

    public void SetCache(string text, string from, string to, dynamic value)
    {
        var key = $"{text}-{from}-{to}";
        //cache.

        _ = new CacheItemPolicy
        {
            AbsoluteExpiration = DateTimeOffset.Now.AddHours(1),

        };
        //cache.Set(key, value, policy);
        _cache[key] = value;
        //cache.Set(key, value, policy);
    }

    public bool CacheExists(string text, string from, string to)
    {
        var key = $"{text}-{from}-{to}";
        return (_cache[key] != null);
    }

    /// Demonstrates Translate API call using Azure Subscription key authentication.
    public async Task<string> TranslateAsync(string text, string from, string to)
    {
        if (from == to)
        {
            return await Task.FromResult(text);
        }

        if (CacheExists(text, from, to))
        {
            var key = $"{text}-{from}-{to}";
            return await Task.FromResult(_cache.Get(key).ToString());
        }

        var result = await TranslateRequest(text, from, to);
        SetCache(text, from, to, result);
        return result;
    }

    private async Task<string> TranslateRequest(string input, string from, string to)
    {
        string url = string.Format(TranslateUrlTemplate, input, from, to, "general");
        string text;
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add(_configuration.SubscriptionKeyHeader, _configuration.Key);
            text = await client.GetStringAsync(url);
            text = XDocument.Parse(text).Root.Value;

        }
        return text;
    }
}
