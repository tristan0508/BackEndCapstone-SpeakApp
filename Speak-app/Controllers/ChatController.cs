using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpeakApp.Data;
using SpeakApp.Models;
using SpeakApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Speak_app.Repository;
using Microsoft.AspNetCore.Authorization;

namespace Speak_app.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private User GetCurrentUserProfile()
        {
            string firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);

        }

        private readonly UserRepository _userRepository;
        private readonly ChatRepository _chatRepository;
        private readonly ApplicationDbContext _context;


        public ChatController(ApplicationDbContext context)
        {
            _chatRepository = new ChatRepository(context);
            _userRepository = new UserRepository(context);
            _context = context;

        }

        [HttpGet("{userId}")]
        public IActionResult GetUserChats(int userId)
        {
            var chats = _chatRepository.GetUserChats(userId);
            return Ok(chats);
        }

        [HttpGet("name/{name}")]
        public IActionResult GetChatByName(string name)
        {
            var chat = _chatRepository.GetChatByName(name);
            return Ok(chat);
        }

        [HttpDelete("{chatId}")]
        public IActionResult  DeleteChat(int chatId)
        {
            var user = GetCurrentUserProfile();
            _chatRepository.removeChat(chatId, user);
            return Ok();
        }

        [HttpPost]
        public IActionResult AddChat(Chat chat)
        {
            _chatRepository.addChat(chat);
            return Ok();
        }
    }
}
