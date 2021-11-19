using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using lpnu.Data;
using lpnu.Data.Entities;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace lpnu.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly EFContext _context;
        private readonly IMapper _mapper;

        public SubjectService(EFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateSubjectAsync(SubjectRequestDto model)
        {
            var subject = _mapper.Map<SubjectRequestDto, Subject>(model);
            await _context.Subjects.AddAsync(subject);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SubjectResponseDto>> GetSubjectsAsync()
        {
            var subjects = await _context.Subjects.ToListAsync();
            return _mapper.Map<IEnumerable<Subject>, IEnumerable<SubjectResponseDto>>(subjects);
        }
    }
}