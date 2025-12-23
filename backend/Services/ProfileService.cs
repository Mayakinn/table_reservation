using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserRepository _userRepository;
        private readonly ICurrentUser _currentUser;

        public ProfileService(
            IUserRepository userRepository,
            ICurrentUser currentUser)
        {
            _userRepository = userRepository;
            _currentUser = currentUser;
        }

        public ProfileDto? GetUserProfile(Guid userId)
        {
            var user = _userRepository.GetByIdWithReservations(userId);
            return user == null ? null : MapToProfileDto(user);
        }

        public ProfileDto GetCurrentUserProfile()
        {
            var userId = _currentUser.GetCurrentUserId();
            var user = _userRepository.GetByIdWithReservations(userId)
                ?? throw new Exception("Current user not found");

            return MapToProfileDto(user);
        }

        private static ProfileDto MapToProfileDto(User user)
        {
            var today = DateTime.Today;

            var reservations = user.Reservations
                .Select(r => new ReservationDto(
                    r.Id,
                    r.DeskId,
                    r.Desk.DeskNumber,
                    r.StartDate,
                    r.EndDate))
                .OrderByDescending(r => r.StartDate)
                .ToList();

            return new ProfileDto(
                user.Id,
                user.FirstName,
                user.LastName,
                reservations.Where(r => r.EndDate.Date >= today).ToList(),
                reservations.Where(r => r.EndDate.Date < today).ToList()
            );
        }
    }
}
