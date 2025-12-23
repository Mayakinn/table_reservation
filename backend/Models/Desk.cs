namespace backend.Models
{
    public class Desk
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int DeskNumber { get; set; }
        public DeskStatus Status { get; set; }
        public string? MaintenanceMessage { get; set; }

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }

}