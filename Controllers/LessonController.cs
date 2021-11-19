using System.Threading.Tasks;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateLessonAsync(LessonRequestDto model)
        {
            var result = await _lessonService.CreateLessonAsync(model);
            return Ok(result);
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetLessonsByGroupNameAsync(string groupName)
        {
            var result = await _lessonService.GetLessonsByGroupNameAsync(groupName);
            return Ok(result);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetLessonsAsync()
        {
            var result = await _lessonService.GetLessonsAsync();
            return Ok(result);
        }
    }
}