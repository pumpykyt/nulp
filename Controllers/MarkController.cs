using System.Linq;
using System.Threading.Tasks;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkController : ControllerBase
    {
        private readonly IMarkService _markService;

        public MarkController(IMarkService markService)
        {
            _markService = markService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddMarkAsync(MarkRequestDto model)
        {
            var result = await _markService.AddMarkAsync(model);
            return Ok(result);
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetUserMarksAsync()
        {
            var userId = User.Claims.Single(t => t.Type == "id").Value;
            var result = await _markService.GetUserMarksAsync(userId);
            return Ok(result);
        }
        
        [HttpGet("get-all")]
        public async Task<IActionResult> GetMarksAsync()
        {
            var result = await _markService.GetMarksAsync();
            return Ok(result);
        }
    }
}