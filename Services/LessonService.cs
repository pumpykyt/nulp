using System;
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
    public class LessonService : ILessonService
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public LessonService(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<LessonResponseDto> CreateLessonAsync(LessonRequestDto model)
        {
            var lesson = _mapper.Map<LessonRequestDto, Lesson>(model);
            lesson.DateTime = DateTime.UtcNow;
            await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();

            var newLesson = await _context.Lessons
                .Include(t => t.Subject)
                .SingleOrDefaultAsync(t => t.Id == lesson.Id);
            
            return _mapper.Map<Lesson, LessonResponseDto>(newLesson);
        }

        public async Task<IEnumerable<LessonResponseDto>> GetLessonsByGroupNameAsync(string groupName)
        {
            var lessons = await _context.Lessons
                .Include(t => t.Subject)
                .Where(t => t.GroupName == groupName)
                .ToListAsync();
            
            return _mapper.Map<IEnumerable<Lesson>, IEnumerable<LessonResponseDto>>(lessons);
        }

        public async Task<IEnumerable<LessonResponseDto>> GetLessonsAsync()
        {
            var lessons = await _context.Lessons
                .Include(t => t.Subject)
                .ToListAsync();
            
            return _mapper.Map<IEnumerable<Lesson>, IEnumerable<LessonResponseDto>>(lessons);
        }
    }
}