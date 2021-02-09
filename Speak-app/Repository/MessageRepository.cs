using Microsoft.EntityFrameworkCore;
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
            var messages = _context.Message.Where(msg => msg.UserId == userId).ToList();
            return messages;
        }

        public Message AddMessage(Message message)
        {
            _context.Add(message);
            _context.SaveChanges();

            Message msg = message;

            return msg;
        }

        public void UpdateMessage(int msgId, string body)
        {
            var msg = _context.Message.FirstOrDefault(m => m.Id == msgId);
            msg.Body = body;
            _context.Entry(msg).State = EntityState.Modified;
            _context.SaveChanges();

        }

        public void RemoveMessage(int msgId)
        {
            Message message = _context.Message.FirstOrDefault(msg => msg.Id == msgId);
            _context.Remove(message);
            _context.SaveChanges();
        }

        public List<Message> ChatMessages(int chatId)
        {
            var messages = _context.Message.Where(msg => msg.ChatId == chatId).ToList();
            return messages;
        }


    }
}
