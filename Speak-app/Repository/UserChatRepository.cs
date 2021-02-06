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

        public UserChatRepository(ApplicationDbContext context)
        {
            _context = context;
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
            _context.Add(userChat);
            _context.SaveChanges();
        }

        public void Delete(int chatId, int userId)
        {
            var userChat = _context.UserChat
                .FirstOrDefault(uc => uc.ChatId == chatId && uc.UserId == userId);
            _context.Remove(userChat);
            _context.SaveChanges();
        }
    }
}
