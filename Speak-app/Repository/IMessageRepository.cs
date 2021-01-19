using SpeakApp.Models;
using System.Collections.Generic;

namespace Speak_app.Repository
{
    public interface IMessageRepository
    {
        List<Message> GetMessagesByUserId(int userId);
    }
}