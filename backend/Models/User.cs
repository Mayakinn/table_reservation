namespace backend.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";

        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }

}