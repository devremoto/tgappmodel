using AutoMapper;
using Application.ViewModels;
using Domain.Entities;
using System.Collections.Generic;

namespace Application.AutoMapper
{
    public class EntityToModel : Profile
    {
        public EntityToModel()
        {
			CreateMap<About, AboutViewModel>();
			CreateMap<Contact, ContactViewModel>();
			CreateMap<Language, LanguageViewModel>();
			CreateMap<Mailing, MailingViewModel>();
			CreateMap<Settings, SettingsViewModel>();
			CreateMap<SocialNetwork, SocialNetworkViewModel>();
			CreateMap<UploadFile, UploadFileViewModel>();
        }
    }
}
