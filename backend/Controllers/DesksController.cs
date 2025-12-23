using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/desks")]
    public class DesksController : ControllerBase
    {
        private readonly IDeskService _deskService;
        private readonly IReservationService _reservationService;

        public DesksController(
            IDeskService deskService,
            IReservationService reservationService)
        {
            _deskService = deskService;
            _reservationService = reservationService;
        }

        [HttpGet]
        public IActionResult GetDesks(
            [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            return Ok(_deskService.GetDesks(from, to));
        }

        [HttpPost("{deskId:guid}/reserve")]
        public IActionResult ReserveDesk(
            Guid deskId,
            [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            _reservationService.ReserveDesk(deskId, from, to);
            return Ok();
        }
    }
}
