using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
                // mapuję główne zdjęcie z listy Photos (czyli to, które ma flagę IsMain ustawioną an true) do właściwości PhotoUrl
            CreateMap<Photo, PhotoDto>();
        }
    }
}