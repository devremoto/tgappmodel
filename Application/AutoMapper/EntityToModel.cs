using AutoMapper;
using Application.ViewModels;
using Domain.Entities;

namespace Application.AutoMapper;

public partial class ModelToViewModel : Profile
{
    public void Map()
    {
		CreateMap<About, AboutViewModel>().ReverseMap();
		CreateMap<Contact, ContactViewModel>().ReverseMap();
		CreateMap<Language, LanguageViewModel>().ReverseMap();
		CreateMap<Mailing, MailingViewModel>().ReverseMap();
		CreateMap<Settings, SettingsViewModel>().ReverseMap();
		CreateMap<SocialNetwork, SocialNetworkViewModel>().ReverseMap();
		CreateMap<UploadFile, UploadFileViewModel>().ReverseMap();
    }
}

