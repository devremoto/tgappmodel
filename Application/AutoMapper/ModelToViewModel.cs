using Application.ViewModels.Common;
using AutoMapper;

namespace Application.AutoMapper;

public partial class ModelToViewModel : Profile
{
    public ModelToViewModel()
    {
        #region AutoMapper
        CreateMap(typeof(PagingViewModel<>), typeof(PagingViewModel<>));
        Map();
        #endregion AutoMapper
    }
}
