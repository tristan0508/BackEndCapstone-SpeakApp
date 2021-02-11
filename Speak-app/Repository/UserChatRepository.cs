using SpeakApp.Data;
using SpeakApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Speak_app.Repository
{
    public class UserChatRepository : IUserChatRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly MessageRepository _messageRepository;

        public UserChatRepository(ApplicationDbContext context)
        {
            _context = context;
            _messageRepository = new MessageRepository(context);
        }

        public List<UserChat> GetUserChatIds(int userId)
        {
            var userChats = _context.UserChat.Where(uc => uc.UserId == userId).ToList();
            return userChats;
        }

        public List<UserChat> GetConnectingUserChat(int chatId, int userId)
        {
            var userChats = _context.UserChat.Where(uc => uc.ChatId == chatId && uc.UserId != userId ).ToList();
            return userChats;
        }

        public void AddUserChat(UserChat userChat)
        {
            var chat = _context.UserChat.FirstOrDefault(uc => uc.ChatId == userChat.ChatId &&
            uc.UserId == userChat.UserId);
            if(chat == null)
            {
                _context.Add(userChat);
                _context.SaveChanges();
            }
        }
        public void DeleteUserChat(int chatId, int userId)
        {

       
            var userChat = _context.UserChat.FirstOrDefault(uc => uc.ChatId == chatId && uc.UserId == userId);
            var msgs = _messageRepository.ChatMessages(chatId);
            foreach(var msg in msgs)
            {
                _messageRepository.RemoveMessage(msg.Id);
                _context.SaveChanges();
            }
        
            _context.Remove(userChat);
            _context.SaveChanges();
        }

        public void Delete(int chatId, int userId)
        {
            var userChat = _context.UserChat
                .FirstOrDefault(uc => uc.ChatId == chatId && uc.UserId == userId);
            if(userChat != null)
            {
                _context.Remove(userChat);
                _context.SaveChanges();
            }
        }
    }
}
