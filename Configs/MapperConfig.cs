using AutoMapper;
using lpnu.Data.Entities;
using lpnu.Dtos;

namespace lpnu.Configs
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Mark, MarkResponseDto>()
                .ForMember(dest => dest.UserName, src => src.MapFrom(t => t.User.UserName))
                .ForMember(dest => dest.TeacherName, src => src.MapFrom(t => t.Subject.TeacherName))
                .ForMember(dest => dest.SubjectName, src => src.MapFrom(t => t.Subject.Name));
            CreateMap<MarkRequestDto, Mark>();
            CreateMap<UserRegisterDto, User>();
            CreateMap<LessonRequestDto, Lesson>();
            CreateMap<Lesson, LessonResponseDto>()
                .ForMember(dest => dest.SubjectName, src => src.MapFrom(t => t.Subject.Name))
                .ForMember(dest => dest.TeacherName, src => src.MapFrom(t => t.Subject.TeacherName));
            CreateMap<User, UserResponseDto>();
            CreateMap<SubjectRequestDto, Subject>();
            CreateMap<Subject, SubjectResponseDto>();
        }
    }
}