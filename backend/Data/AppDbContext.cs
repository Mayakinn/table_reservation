using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users => Set<User>();
        public DbSet<Desk> Desks => Set<Desk>();
        public DbSet<Reservation> Reservations => Set<Reservation>();

        public static Guid CurrentUserId { get; private set; }

        public static void SeedData(AppDbContext context)
        {
            if (context.Users.Any()) return;

            var currentUser = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "CurrentUser",
                LastName = "CurrentUserLastName"
            };

            var otherUser = new User
            {
                Id = Guid.NewGuid(),
                FirstName = "Someone",
                LastName = "Else"
            };

            CurrentUserId = currentUser.Id;
            
            var desks = Enumerable.Range(1, 6).Select(i => new Desk
            {
                Id = Guid.NewGuid(),
                DeskNumber = i,
                Status = DeskStatus.Open
            }).ToList();
            var maintenanceDesk = new Desk
            {
                Id = Guid.NewGuid(),
                DeskNumber = 7,
                Status = DeskStatus.Maintenance,
                MaintenanceMessage = "Desk broken :("
            };

            desks.Add(maintenanceDesk);

            var reservations = new List<Reservation>
            {
                new() {
                    Id = Guid.NewGuid(),
                    UserId = currentUser.Id,
                    DeskId = desks[0].Id,
                    StartDate = DateTime.Today.AddDays(-2),
                    EndDate = DateTime.Today.AddDays(1)
                },
                new() {
                    Id = Guid.NewGuid(),
                    UserId = otherUser.Id,
                    DeskId = desks[1].Id,
                    StartDate = DateTime.Today,
                    EndDate = DateTime.Today.AddDays(3)
                }
            };

            desks[0].Status = DeskStatus.Reserved;
            desks[1].Status = DeskStatus.Reserved;

            context.Users.AddRange(currentUser, otherUser);
            context.Desks.AddRange(desks);
            context.Reservations.AddRange(reservations);

            context.SaveChanges();
        }
    }
}
