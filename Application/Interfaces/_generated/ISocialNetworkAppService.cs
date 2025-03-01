using Domain.Entities;

namespace Application.Interfaces;

public partial interface ISocialNetworkAppService : IBaseAppService<SocialNetwork>
{
    SocialNetwork Save(SocialNetwork viewModel, bool edit = false);
}

