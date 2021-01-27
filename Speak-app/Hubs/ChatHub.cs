using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
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
        public string GetConnectionId() =>
            Context.ConnectionId;

        public string GetUserId()
        {

            return Context.User?.Claims?.FirstOrDefault(x => x.Type ==
            ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task SendMessage(Message message)
        {
            var user = GetUser();

            var newMessage = new Message
            {
                Body = message.Body,
                ChatId = message.ChatId,
                UserId = user.Id,
                DateCreated = DateTime.Now
            };

             Message msg = _messageRepository.AddMessage(newMessage);

            await Clients.All.SendAsync("ReceiveMessage", msg);
        }

        public async Task SendToCaller(Message message)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", message.Body);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var chat = new Chat()
            {
                Name = groupName,
                Type = "Channel"
            };

            _chatRepository.addChat(chat);

            var username = GetUser();

            await Clients.Group(groupName).SendAsync("Send", $"{username.DisplayName} has joined the group");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            var username = GetUser();

            await Clients.Group(groupName).SendAsync("Send", $"{username.DisplayName} has left the group");
        }

        public void SendChatMessage(string who, string message)
        {
            string name = Context.User.Identity.Name;

            Clients.Group(who).SendAsync("AddChatMessage", message, name);
        }

        public string GetName()
        {
            string name = Context.User.Identity.Name;
            return name;
        }
    }
}
