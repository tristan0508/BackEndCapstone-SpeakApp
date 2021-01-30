﻿using Microsoft.AspNetCore.Authorization;
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
        public string GetConnectionId() =>
            Context.ConnectionId;

        public string GetUserId()
        {

            return Context.User?.Claims?.FirstOrDefault(x => x.Type ==
            ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task SendMessage(Message message, Receiver who)
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

        public async Task SendToCaller(Message message)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", message.Body);
        }

        public async Task AddToDirectChat(string id)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, id);

            var chat = new Chat()
            {
                Name = id,
                Type = "Direct Message"
            };

            _chatRepository.addChat(chat);

            var username = GetUser();

            await Clients.Group(id).SendAsync("Send", $"{username.DisplayName} has joined the group");
        }

        public async Task RemoveFromGroupChat(string groupName)
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
