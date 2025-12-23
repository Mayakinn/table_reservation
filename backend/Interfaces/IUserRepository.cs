using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        User? GetByIdWithReservations(Guid userId);
    }
}