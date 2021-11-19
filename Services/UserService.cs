using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using lpnu.Data;
using lpnu.Data.Entities;
using lpnu.Dtos;
using lpnu.Helpers;
using lpnu.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class UserService : IUserService
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public UserService(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserStatsDto> GetUserStatsAsync(string userId)
        {
            var marksSum = await _context.Marks
                .Where(t => t.UserId == userId)
                .Select(t => t.Value)
                .SumAsync();
            
            var marksCount = await _context.Marks
                .Where(t => t.UserId == userId)
                .CountAsync();
            
            return new UserStatsDto
            {
                AverageMark = Convert.ToDouble((marksSum / marksCount))
            };
        }

        public async Task UploadImageAsync(string userId, ImageRequestDto model)
        {
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == userId);
            var fileName = await ImageHelper.SaveImageAsync(model.Base64);
            user.ImagePath = fileName;
            await _context.SaveChangesAsync();
        }

        public async Task<UserResponseDto> GetCurrentUserAsync(string userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(t => t.Id == userId);
            return _mapper.Map<User, UserResponseDto>(user);
        }

        public async Task<IEnumerable<UserResponseDto>> GetUsersAsync()
        {
            var users = await _context.Users
                .Where(t => t.Email != "teacher@gmail.com")
                .ToListAsync();

            return _mapper.Map<IEnumerable<User>, IEnumerable<UserResponseDto>>(users);
        }
    }
}