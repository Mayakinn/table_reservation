namespace backend.Models
{
    public class Reservation
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid DeskId { get; set; }
        public Desk Desk { get; set; } = null!;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}