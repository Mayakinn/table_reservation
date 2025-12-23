using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class DeskService : IDeskService
    {
        private readonly IDeskRepository _deskRepository;
        private readonly ICurrentUser _currentUser;

        public DeskService(
            IDeskRepository deskRepository,
            ICurrentUser currentUser)
        {
            _deskRepository = deskRepository;
            _currentUser = currentUser;
        }

        public IEnumerable<DeskAvailabilityDto> GetDesks(
            DateTime from,
            DateTime to)
        {
            var currentUserId = _currentUser.GetCurrentUserId();

            var desks = _deskRepository.GetAllWithReservationsAndUsers();

            return desks.Select(desk =>
            {
                if (desk.Status == DeskStatus.Maintenance)
                {
                    return new DeskAvailabilityDto(
                        desk.Id,
                        desk.DeskNumber,
                        DeskStatus.Maintenance,
                        null,
                        false,
                        desk.MaintenanceMessage,
                        null);
                }

                var overlapping = desk.Reservations
                    .FirstOrDefault(r =>
                        r.StartDate <= to &&
                        r.EndDate >= from);

                if (overlapping != null)
                {
                    return new DeskAvailabilityDto(
                        desk.Id,
                        desk.DeskNumber,
                        DeskStatus.Reserved,
                        $"{overlapping.User.FirstName} {overlapping.User.LastName}",
                        overlapping.UserId == currentUserId,
                        null,
                        overlapping.UserId == currentUserId
                            ? overlapping.Id
                            : null
                    );
                }

                return new DeskAvailabilityDto(
                    desk.Id,
                    desk.DeskNumber,
                    DeskStatus.Open,
                    null,
                    false,
                    null,
                    null);
            });
        }
    }
}
