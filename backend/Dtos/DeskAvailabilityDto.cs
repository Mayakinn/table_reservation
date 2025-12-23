using backend.Models;

namespace backend.Dtos
{
    public record DeskAvailabilityDto(
        Guid DeskId,
        int DeskNumber,
        DeskStatus Status,
        string? ReservedBy,
        bool IsReservedByCurrentUser,
        string? MaintenanceMessage,
        Guid? ReservationId);

}