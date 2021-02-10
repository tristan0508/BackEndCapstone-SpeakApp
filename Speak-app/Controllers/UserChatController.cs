using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class userChatController : ControllerBase
    {
        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        private readonly UserRepository _userRepository;
        private readonly UserChatRepository _userChatRepository;

        public userChatController(ApplicationDbContext context)
        {
            _userChatRepository = new UserChatRepository(context);
            _userRepository = new UserRepository(context);
        }

        [HttpPost]
        public IActionResult AddUserChat(UserChat chat)
        {
            _userChatRepository.AddUserChat(chat);
            return Ok();
        }
        [HttpDelete("{chatId}")]
        public IActionResult DeleteUserChat(int chatId)
        {
            var userId = GetCurrentUserProfile().Id;
            _userChatRepository.DeleteUserChat(chatId, userId);
            return Ok();
        }
    }
}
