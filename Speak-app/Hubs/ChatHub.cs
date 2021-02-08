using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Speak_app.Models;
using Speak_app.Repository;
using SpeakApp.Data;
using SpeakApp.Models;
using SpeakApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Speak_app.Hubs
{
    [Authorize]
    public class ChatHub : Hub 
    {

        private readonly MessageRepository _messageRepository;
        private readonly ChatRepository _chatRepository;
        private readonly UserRepository _userRepository;

        public ChatHub(ApplicationDbContext context)
        {
            _messageRepository = new MessageRepository(context);
            _chatRepository = new ChatRepository(context);
            _userRepository = new UserRepository(context);
        }

        private User GetUser()
        {
            var firebaseId = Context.User?.Claims?.FirstOrDefault(x => x.Type ==
            ClaimTypes.NameIdentifier)?.Value;
            var user = _userRepository.GetByFirebaseUserId(firebaseId);
            return user;
        }

        public async Task SendMessage(Message message)
        {
            var user = GetUser();

            var newMessage = new Message
            {
                Body = message.Body,
                ChatId = message.ChatId,
                UserId = user.Id,
                DisplayName = message.DisplayName,
                UserImage = message.UserImage,
                DateCreated = DateTime.Now
            };

             Message msg = _messageRepository.AddMessage(newMessage);
            // Two possible end points depending on new chat or not for receiver
            await Clients.Group(message.ChatId.ToString()).SendAsync("ReceiveMessage", msg);
        }

        public override Task OnConnectedAsync()
        {
            int userId = GetUser().Id;

            var allChats = _chatRepository.GetUserChats(userId);

            foreach(var chat in allChats)
            {
                string chatId = chat.Id.ToString();
                Groups.AddToGroupAsync(Context.ConnectionId, chatId);
            }

            return base.OnConnectedAsync();
        }


        public async Task AddToDirectChat(Chat chat)
        {
            var user = GetUser();

            _chatRepository.addChat(chat, user.Id, user.Email);

            string chatId = chat.Id.ToString();

            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);    
        }

        public async Task RemoveFromGroupChat(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            var username = GetUser();

            await Clients.Group(groupName).SendAsync("Send", $"{username.DisplayName} has left the group");
        }



    }
}
