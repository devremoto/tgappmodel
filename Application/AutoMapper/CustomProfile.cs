using Application.ViewModels;
using Application.ViewModels.Common;
using AutoMapper;
using Domain.Entities;
using System.Linq;

namespace Application.AutoMapper
{
    public class CustomProfile : Profile
    {
        public CustomProfile()
        {
           CreateMap(typeof(PagingViewModel<>), typeof(PagingViewModel<>)); 
        }
    }


}

