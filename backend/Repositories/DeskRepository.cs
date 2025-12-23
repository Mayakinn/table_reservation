using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class DeskRepository : IDeskRepository
    {
        private readonly AppDbContext _context;

        public DeskRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Desk> GetAllWithReservationsAndUsers()
        {
            return _context.Desks
                .AsNoTracking()
                .Include(d => d.Reservations)
                    .ThenInclude(r => r.User)
                .ToList();
        }

        public Desk? GetByIdWithReservations(Guid deskId)
        {
            return _context.Desks
                .Include(d => d.Reservations)
                .FirstOrDefault(d => d.Id == deskId);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }


}