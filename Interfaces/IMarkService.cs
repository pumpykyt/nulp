using System.Collections.Generic;
using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface IMarkService
    {
        Task<MarkResponseDto> AddMarkAsync(MarkRequestDto model);
        Task<IEnumerable<MarkResponseDto>> GetUserMarksAsync(string userId);
        Task<IEnumerable<MarkResponseDto>> GetMarksAsync();
    }
}