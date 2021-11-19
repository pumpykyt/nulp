using System.Collections.Generic;
using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface ISubjectService
    {
        Task CreateSubjectAsync(SubjectRequestDto model);
        Task<IEnumerable<SubjectResponseDto>> GetSubjectsAsync();
    }
}