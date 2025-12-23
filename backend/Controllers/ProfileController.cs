using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{userId:guid}")]
        public IActionResult GetProfile(Guid userId)
        {
            var dto = _profileService.GetUserProfile(userId);
            return dto == null ? NotFound() : Ok(dto);
        }
        [HttpGet]
        public IActionResult GetProfile()
        {
            var dto = _profileService.GetCurrentUserProfile();
            return Ok(dto);
        }

    }



}