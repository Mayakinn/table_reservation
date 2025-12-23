using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public User? GetByIdWithReservations(Guid userId)
        {
            return _context.Users
                .AsNoTracking()
                .Include(u => u.Reservations)
                    .ThenInclude(r => r.Desk)
                .FirstOrDefault(u => u.Id == userId);
        }
    }
}