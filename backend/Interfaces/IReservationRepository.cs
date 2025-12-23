using backend.Models;

namespace backend.Interfaces
{

    public interface IReservationRepository
    {
        Reservation? GetByIdWithDesk(Guid reservationId);
        void Add(Reservation reservation);
        void Remove(Reservation reservation);
        void Save();
    }

}