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
    }
}
