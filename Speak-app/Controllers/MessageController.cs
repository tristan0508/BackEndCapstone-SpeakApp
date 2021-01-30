using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Speak_app.Hubs;
using Speak_app.Repository;
using SpeakApp.Data;
using SpeakApp.Models;
using SpeakApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Speak_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private User GetCurrentUserProfile()
        {
            string firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        private readonly UserRepository _userRepository;
        private readonly MessageRepository _messageRepository;
      
        public MessageController(ApplicationDbContext context)
        {
            _messageRepository = new MessageRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpGet]
        public IActionResult GetMessagesByUserId()
        {
            var user = GetCurrentUserProfile();
            var messages = _messageRepository.GetMessagesByUserId(user.Id);
            return Ok(messages);
        }

        [HttpPost("{msgId}")]
        public IActionResult DeleteMessage(int msgId)
        {
            _messageRepository.RemoveMessage(msgId);
            return Ok();
        }

        [HttpGet("{chatId}")]
        public IActionResult GetMessagesBuChatId(int chatId)
        {
            var messages = _messageRepository.ChatMessages(chatId);
            return Ok(messages);
        }
    }
}
