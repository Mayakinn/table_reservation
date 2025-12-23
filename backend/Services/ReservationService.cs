using backend.Interfaces;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IDeskRepository _deskRepo;
        private readonly IReservationRepository _reservationRepo;
        private readonly ICurrentUser _currentUser;

        public ReservationService(
            IDeskRepository deskRepo,
            IReservationRepository reservationRepo,
            ICurrentUser currentUser)
        {
            _deskRepo = deskRepo;
            _reservationRepo = reservationRepo;
            _currentUser = currentUser;
        }

        public void ReserveDesk(Guid deskId, DateTime from, DateTime to)
        {
            var userId = _currentUser.GetCurrentUserId();

            var desk = _deskRepo.GetByIdWithReservations(deskId)
                ?? throw new Exception("Desk not found");

            if (desk.Status == DeskStatus.Maintenance)
                throw new Exception("Desk is under maintenance");

            var overlaps = desk.Reservations.Any(r =>
                r.StartDate <= to &&
                r.EndDate >= from);

            if (overlaps)
                throw new Exception("Desk already reserved for this period");

            var reservation = new Reservation
            {
                Id = Guid.NewGuid(),
                DeskId = deskId,
                UserId = userId,
                StartDate = from.Date,
                EndDate = to.Date
            };

            desk.Status = DeskStatus.Reserved;

            _reservationRepo.Add(reservation);
            _deskRepo.Save();
        }

        public void CancelReservation(Guid reservationId)
        {
            var reservation = _reservationRepo.GetByIdWithDesk(reservationId);
            if (reservation == null) return;

            reservation.Desk.Status = DeskStatus.Open;

            _reservationRepo.Remove(reservation);
            _reservationRepo.Save();
        }

        public void CancelForTheDay(Guid reservationId, DateTime day)
        {
            day = day.Date;

            var reservation = _reservationRepo.GetByIdWithDesk(reservationId)
                ?? throw new Exception("Reservation not found");

            if (day < reservation.StartDate.Date || day > reservation.EndDate.Date)
                throw new Exception("Day outside reservation range");

            if (reservation.StartDate.Date == day &&
                reservation.EndDate.Date == day)
            {
                reservation.Desk.Status = DeskStatus.Open;
                _reservationRepo.Remove(reservation);
            }
            else if (reservation.StartDate.Date == day)
            {
                reservation.StartDate = day.AddDays(1);
            }
            else if (reservation.EndDate.Date == day)
            {
                reservation.EndDate = day.AddDays(-1);
            }
            else
            {
                var secondHalf = new Reservation
                {
                    Id = Guid.NewGuid(),
                    DeskId = reservation.DeskId,
                    UserId = reservation.UserId,
                    StartDate = day.AddDays(1),
                    EndDate = reservation.EndDate
                };

                reservation.EndDate = day.AddDays(-1);
                _reservationRepo.Add(secondHalf);
            }

            _reservationRepo.Save();
        }
    }
}
