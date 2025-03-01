using CrossCutting.Services.Services;
using Domain.Interfaces;
using Domain.Services.Interfaces;
using System.Threading.Tasks;

namespace Application.Services;

public partial class LanguageAppService
{

    private readonly ITranslateService _translateService;

    public LanguageAppService(ILanguageService service, IUnitOfWork uow, ITranslateService translateService)
    : base(service, uow)
    {
        _uow = uow;
        _service = service;
        _translateService = translateService;
    }

    public async Task<dynamic> TranslateAsync(string text, string from, string to)
    {
        var result = await _translateService.TranslateAsync(text, from, to);
        return result;
    }


}
