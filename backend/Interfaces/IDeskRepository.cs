using backend.Models;

namespace backend.Repositories
{
    public interface IDeskRepository
    {
        Desk? GetByIdWithReservations(Guid deskId);
        IEnumerable<Desk> GetAllWithReservationsAndUsers();
        void Save();
    }
}