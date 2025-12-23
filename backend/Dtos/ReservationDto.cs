namespace backend.Dtos
{
    public record ReservationDto(
        Guid ReservationId,
        Guid DeskId,
        int DeskNumber,
        DateTime StartDate,
        DateTime EndDate);

}