using SpeakApp.Data;
using SpeakApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Speak_app.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ApplicationDbContext _context;
        public MessageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Message> GetMessagesByUserId(int userId)
        {
            var messages = _context.Message.Where(msg => msg.UserId == userId);
            var listOfMessages = new List<Message>();
            foreach(var msg in messages)
            {
                listOfMessages.Add(msg);
            }
            return listOfMessages;
        }
    }
}
