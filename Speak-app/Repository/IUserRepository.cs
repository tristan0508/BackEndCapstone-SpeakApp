using SpeakApp.Models;

namespace SpeakApp.Repository
{
    public interface IUserRepository
    {
        void Add(User user);
        User GetByFirebaseUserId(string firebaseUserId);
    }
}