using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using lpnu.Dtos;
using lpnu.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lpnu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPdfService _pdfService;

        public UserController(IUserService userService, IPdfService pdfService)
        {
            _userService = userService;
            _pdfService = pdfService;
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImageAsync(ImageRequestDto model)
        {
            var userId = User.Claims.Single(t => t.Type == "id").Value;
            await _userService.UploadImageAsync(userId, model);
            return Ok();
        }

        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUserAsync()
        {
            var userId = User.Claims.Single(t => t.Type == "id").Value;
            var result = await _userService.GetCurrentUserAsync(userId);
            return Ok(result);
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetUsersAsync()
        {
            var result = await _userService.GetUsersAsync();
            return Ok(result);
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetUserStatsAsync()
        {
            var userId = User.Claims.Single(t => t.Type == "id").Value;
            var result = await _userService.GetUserStatsAsync(userId);
            return Ok(result);
        }
        
        [HttpGet("stats/pdf")]
        public async Task<IActionResult> GetUserStatsPdfAsync(string userId)
        {
            var result = await _pdfService.CreatePdf(userId);
            return File(result, "application/pdf");
        }
    }
}