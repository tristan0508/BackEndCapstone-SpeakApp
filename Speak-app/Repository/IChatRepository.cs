using SpeakApp.Models;

namespace SpeakApp.Repository
{
    public interface IChatRepository
    {
        Chat GetChatById(int id);
        Chat GetChatByName(string name);
    }
}