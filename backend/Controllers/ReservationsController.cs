using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/reservations")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpDelete("{reservationId:guid}")]
        public IActionResult CancelReservation(Guid reservationId)
        {
            _reservationService.CancelReservation(reservationId);
            return NoContent();
        }

        [HttpDelete("{reservationId:guid}/day")]
        public IActionResult CancelForDay(
            Guid reservationId,
            [FromQuery] DateTime day)
        {
            _reservationService.CancelForTheDay(reservationId, day);
            return NoContent();
        }
    }
}
