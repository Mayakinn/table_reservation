using backend.Dtos;

namespace backend.Interfaces
{
    public interface IDeskService
    {
        IEnumerable<DeskAvailabilityDto> GetDesks(DateTime from, DateTime to);
    }

}