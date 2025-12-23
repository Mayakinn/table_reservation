using backend.Dtos;

namespace backend.Interfaces
{
    public interface IProfileService
    {
        ProfileDto? GetUserProfile(Guid userId);

        ProfileDto? GetCurrentUserProfile();
    }

}