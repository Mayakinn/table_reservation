using backend.Interfaces;
using backend.Data;

namespace backend.Services
{
    public class CurrentUser : ICurrentUser
    {
        public Guid GetCurrentUserId()
            => AppDbContext.CurrentUserId;
    }
}
