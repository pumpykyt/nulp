using System.Collections.Generic;
using System.Threading.Tasks;
using lpnu.Dtos;

namespace lpnu.Interfaces
{
    public interface IUserService
    {
        Task<UserStatsDto> GetUserStatsAsync(string userId);
        Task UploadImageAsync(string userId, ImageRequestDto model);
        Task<UserResponseDto> GetCurrentUserAsync(string userId);
        Task<IEnumerable<UserResponseDto>> GetUsersAsync();
    }
}