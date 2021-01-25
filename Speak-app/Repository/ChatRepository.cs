using Speak_app.Repository;
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
        private readonly MessageRepository _messageRepository;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
            _messageRepository = new MessageRepository(context);
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

        public Chat addChat(Chat chat)
        {
            _context.Add(chat);
            _context.SaveChanges();
            var chatObj = GetChatById(chat.Id);
            return chatObj;
        }

        public void removeChat(int chatId)
        {   
            var messages = _messageRepository.ChatMessages(chatId);
            foreach(Message message in messages)
            {
                _context.Remove(message);
            };
            _context.SaveChanges();

            var chat = GetChatById(chatId);
            _context.Remove(chat);

            _context.SaveChanges();
        }
    }
}
