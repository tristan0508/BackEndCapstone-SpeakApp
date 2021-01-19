using SpeakApp.Data;
using SpeakApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakApp.Repository
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Chat GetChatById(int id)
        {
            var chat = _context.Chat.FirstOrDefault(chat => chat.Id == id);
            return chat;
        }
        public Chat GetChatByName(string name)
        {
            var chat = _context.Chat.FirstOrDefault(chat => chat.Name == name);
            return chat;
        }
    }
}
