namespace backend.Interfaces
{
    public interface IReservationService
    {
        void ReserveDesk(Guid deskId, DateTime from, DateTime to);
        void CancelReservation(Guid reservationId);
        void CancelForTheDay(Guid reservationId, DateTime day);
    }


}