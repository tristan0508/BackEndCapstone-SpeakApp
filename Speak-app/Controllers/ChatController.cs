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


        public ChatController(ApplicationDbContext context)
        {
            _chatRepository = new ChatRepository(context);
            _userRepository = new UserRepository(context);

        }

        [HttpGet("{userId}")]
        public IActionResult GetUserChats(int userId)
        {
            var chats = _chatRepository.GetUserChats(userId);
            return Ok(chats);
        }

        //[HttpGet("{chatId}")]
        //public IActionResult GetChatById(int chatId, string name)
        //{
        //    var chat =_chatRepository.GetChatById(chatId);
        //    return Ok(chat);
        //}

        [HttpGet("name/{name}")]
        public IActionResult GetChatByName(string name)
        {
            var chat = _chatRepository.GetChatByName(name);
            return Ok(chat);
        }

        [HttpPost("{chatId}")]
        public IActionResult  DeleteChat(int chatId)
        {
            _chatRepository.removeChat(chatId);
            return Ok();
        }
    }
}
