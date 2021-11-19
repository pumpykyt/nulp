using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using lpnu.Data;
using lpnu.Data.Entities;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class MarkService : IMarkService
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public MarkService(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<MarkResponseDto> AddMarkAsync(MarkRequestDto model)
        {
            var mark = _mapper.Map<MarkRequestDto, Mark>(model);
            await _context.Marks.AddAsync(mark);
            await _context.SaveChangesAsync();
            var user = await _context.Users
                .Include(t => t.Marks)
                .SingleOrDefaultAsync(t => t.Id == model.UserId);
            
            user.Marks.Add(mark);
            await _context.SaveChangesAsync();
            
            var newMark = await _context.Marks
                .Include(t => t.Subject)
                .Include(t => t.User)
                .SingleOrDefaultAsync(t => t.Id == mark.Id);
            
            return _mapper.Map<Mark, MarkResponseDto>(newMark);
        }

        public async Task<IEnumerable<MarkResponseDto>> GetUserMarksAsync(string userId)
        {
            var marks = await _context.Marks
                .Include(t => t.Subject)
                .Include(t => t.User)
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<Mark>, IEnumerable<MarkResponseDto>>(marks);
        }
        
        public async Task<IEnumerable<MarkResponseDto>> GetMarksAsync()
        {
            var marks = await _context.Marks
                .Include(t => t.Subject)
                .Include(t => t.User)
                .ToListAsync();

            return _mapper.Map<IEnumerable<Mark>, IEnumerable<MarkResponseDto>>(marks);
        }
    }
}