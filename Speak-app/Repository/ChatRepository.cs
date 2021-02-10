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
        private readonly UserChatRepository _userChatRepository;
        private readonly UserRepository _userRepository;


        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
            _messageRepository = new MessageRepository(context);
            _userChatRepository = new UserChatRepository(context);
            _userRepository = new UserRepository(context);
        }

        public List<Chat> GetUserChats(int userId)
        {
            List<int> chatId = new List<int>();
            var userChats = _userChatRepository.GetUserChatIds(userId);
            foreach (var chat in userChats)
            {
                chatId.Add(chat.ChatId);
            }


            List<Chat> chats = new List<Chat>();
            foreach (var id in chatId)
            {
                Chat chat = _context.Chat.FirstOrDefault(chat => chat.Id == id);

                chats.Add(chat);
            }

            return chats;
        }

        public List<Chat> GetGroupChats()
        {
           var chats = _context.Chat.Where(c => c.Type == "Channel").ToList();
           return chats;
        }

        public Chat GetChatById(int id)
        {
            var chat = _context.Chat.FirstOrDefault(chat => chat.Id == id);
            return chat;
        }
        public Chat GetChatByName(string name)
        {
            var chat = _context.Chat.FirstOrDefault(chat => chat.Name == name && chat.Type == "Channel");
            return chat;
        }

        public void addChat(Chat chat, int userId, string email)
        {
            var exist = _context.Chat.FirstOrDefault(c =>
            c.SenderEmail == email && chat.ReceiverEmail == c.ReceiverEmail || c.ReceiverEmail == email && chat.ReceiverEmail == c.SenderEmail);

            if (exist != null)
            {
                if (exist.SenderEmail != email)
                {
                    var ucExist = _context.UserChat.FirstOrDefault(uc => uc.UserId == userId && uc.ChatId == exist.Id);
                    if (ucExist == null)
                    {
                        var userChat = new UserChat()
                        {
                            ChatId = exist.Id,
                            UserId = userId,
                        };
                        _userChatRepository.AddUserChat(userChat);
                    }
                }
                throw new Exception();
            }

            var newChat = new Chat()
            {
                Name = chat.Sender,
                Type = chat.Type,
                Sender = chat.Sender,
                Receiver = chat.Receiver,
                SenderImage = chat.SenderImage,
                ReceiverImage = chat.ReceiverImage,
                SenderEmail = email,
                ReceiverEmail = chat.ReceiverEmail
            };
            _context.Add(newChat);
            _context.SaveChanges();


            var newUserChat = new UserChat()
            {
                ChatId = newChat.Id,
                UserId = userId,
            };

            _userChatRepository.AddUserChat(newUserChat);
        }

        public void AddChannel(Chat chat, int userId, string email)
        {
            var exist = _context.Chat.FirstOrDefault(c => c.Name == chat.Name);

            if (exist != null)
            {
                if (exist.SenderEmail != email)
                {
                    var ucExist = _context.UserChat.FirstOrDefault(uc => uc.UserId == userId && uc.ChatId == exist.Id);
                    if (ucExist == null)
                    {
                        var userChat = new UserChat()
                        {
                            ChatId = exist.Id,
                            UserId = userId,
                        };
                        _userChatRepository.AddUserChat(userChat);
                    }
                }
                throw new Exception();
            }

            var newChat = new Chat()
            {
                Name = chat.Name,
                Type = chat.Type,
                Sender = chat.Sender,
                Receiver = chat.Receiver,
                SenderImage = chat.SenderImage,
                ReceiverImage = chat.ReceiverImage,
                SenderEmail = email,
                ReceiverEmail = chat.ReceiverEmail
            };
            _context.Add(newChat);
            _context.SaveChanges();


            var newUserChat = new UserChat()
            {
                ChatId = newChat.Id,
                UserId = userId,
            };

            _userChatRepository.AddUserChat(newUserChat);

        }

        public void removeChat(int chatId, User user)
        {
            var messages = _messageRepository.ChatMessages(chatId);
            foreach (Message message in messages)
            {
                _context.Remove(message);
            };
            _context.SaveChanges();

            var userId = user.Id;
            _userChatRepository.Delete(chatId, userId);

            var chat = GetChatById(chatId);
            _context.Remove(chat);

            _context.SaveChanges();
        }
    }
}