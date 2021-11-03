using AutoMapper;
using CourseProject.API.ViewModel;
using CourseProject.BLL.Models;
using CourseProject.BLL.SharedModels;
using CourseProject.DAL.Models;

namespace CourseProject.API.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<LoginViewModel, LoginModel>();
            CreateMap<RegisterViewModel, RegisterModel>();

            CreateMap<RegisterModel, User>();

            CreateMap<User, UserModel>()
                .ForMember(dest => dest.Role,
                    source => source.MapFrom(res => new RoleModel() { Name = res.Role.NormalizedName }));

            CreateMap<UserModel, UserViewModel>()
                .ForMember(dest => dest.Role, source => source.MapFrom(res => res.Role.Name));
        }
    }
}