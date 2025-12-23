using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;

        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }

        public Reservation? GetByIdWithDesk(Guid reservationId)
        {
            return _context.Reservations
                .Include(r => r.Desk)
                .FirstOrDefault(r => r.Id == reservationId);
        }

        public void Add(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
        }

        public void Remove(Reservation reservation)
        {
            _context.Reservations.Remove(reservation);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }


}