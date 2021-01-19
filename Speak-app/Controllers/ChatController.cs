using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class ChatController : ControllerBase
    {
        private readonly ChatRepository _chatRepository;


        public ChatController(ApplicationDbContext context)
        {
            _chatRepository = new ChatRepository(context);

        }

        [HttpGet("{chatId}")]
        public IActionResult GetChatById(int chatId)
        {
            var chat =_chatRepository.GetChatById(chatId);
            return Ok(chat);
        }

        [HttpGet("name/{name}")]
        public IActionResult GetChatByName(string name)
        {
            var chat = _chatRepository.GetChatByName(name);
            return Ok(chat);
        }
    }
}
