using SpeakApp.Models;
using System.Collections.Generic;

namespace Speak_app.Repository
{
    public interface IUserChatRepository
    {
        List<UserChat> GetUserChatIds(int userId);
    }
}