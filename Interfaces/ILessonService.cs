using System.Collections.Generic;
using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface ILessonService
    {
        Task<LessonResponseDto> CreateLessonAsync(LessonRequestDto model);
        Task<IEnumerable<LessonResponseDto>> GetLessonsByGroupNameAsync(string groupName);
        Task<IEnumerable<LessonResponseDto>> GetLessonsAsync();
    }
}