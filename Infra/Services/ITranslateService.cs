using System.Threading.Tasks;

namespace CrossCutting.Services.Services;

public interface ITranslateService
{
    Task<string> TranslateAsync(string text, string from, string to);
    string Translate(string text, string from, string to);
}