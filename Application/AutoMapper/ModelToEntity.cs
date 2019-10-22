using AutoMapper;
using Application.ViewModels;
using Domain.Entities;
using System.Collections.Generic;

namespace Application.AutoMapper
{
    public class ModelToEntity : Profile
    {
        public ModelToEntity()
        {
			CreateMap<AboutViewModel, About>();
			CreateMap<ContactViewModel, Contact>();
			CreateMap<LanguageViewModel, Language>();
			CreateMap<MailingViewModel, Mailing>();
			CreateMap<SettingsViewModel, Settings>();
			CreateMap<SocialNetworkViewModel, SocialNetwork>();
			CreateMap<UploadFileViewModel, UploadFile>();
        }
    }
}
