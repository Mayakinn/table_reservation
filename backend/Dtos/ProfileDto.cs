namespace backend.Dtos
{
    public record ProfileDto(
        Guid UserId,
        string FirstName,
        string LastName,
        List<ReservationDto> CurrentReservations,
        List<ReservationDto> PastReservations);

}