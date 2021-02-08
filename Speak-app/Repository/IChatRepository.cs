using SpeakApp.Models;

namespace SpeakApp.Repository
{
    public interface IChatRepository
    {
        void AddChannel(Chat chat, int userId, string email);
        Chat GetChatById(int id);
        Chat GetChatByName(string name);
    }
}