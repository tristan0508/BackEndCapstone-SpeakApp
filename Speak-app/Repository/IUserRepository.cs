using SpeakApp.Models;
using System.Collections.Generic;

namespace SpeakApp.Repository
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> AllUsers();
        User GetByFirebaseUserId(string firebaseUserId);
    }
}