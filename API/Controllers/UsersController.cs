using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController // dziedziczenie - nie musimy używać atrybutów
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            return user;
        }

    }
}