using Application.ViewModels;
using Application.ViewModels.Common;
using AutoMapper;
using Domain.Entities;

namespace Application.AutoMapper;

public class ModelToViewModel : Profile
{
    public ModelToViewModel()
    {
        #region AutoMapper
        CreateMap(typeof(PagingViewModel<>), typeof(PagingViewModel<>));
        CreateMap<About, AboutViewModel>().ReverseMap();
        CreateMap<Contact, ContactViewModel>().ReverseMap();
        CreateMap<Language, LanguageViewModel>().ReverseMap();
        CreateMap<Mailing, MailingViewModel>().ReverseMap();
        CreateMap<Settings, SettingsViewModel>().ReverseMap();
        CreateMap<SocialNetwork, SocialNetworkViewModel>().ReverseMap();
        CreateMap<UploadFile, UploadFileViewModel>().ReverseMap();
        #endregion AutoMapper
    }
}
