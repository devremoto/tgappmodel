using AutoMapper;

namespace Application.AutoMapper
{
    public class MapperConfig
    {
        [System.Obsolete]
        public static void Register()
        {
            //Mapper.Initialize(cfg => cfg.AddProfile<EntityToModel>());
            //Mapper.Initialize(cfg => cfg.AddProfile<ModelToEntity>());
            //Mapper.Initialize(cfg => cfg.AddProfile<CustomProfile>());

        }
    }
}
