using System.Threading.Tasks;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;

        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateSubjectAsync(SubjectRequestDto model)
        {
            await _subjectService.CreateSubjectAsync(model);
            return Ok();
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetSubjectsAsync()
        {
            var result = await _subjectService.GetSubjectsAsync();
            return Ok(result);
        }
    }
}