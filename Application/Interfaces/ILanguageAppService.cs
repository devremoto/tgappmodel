
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public partial interface ILanguageAppService 
    {
        Task<dynamic> TranslateAsync(string text, string from, string to);
    }
}

