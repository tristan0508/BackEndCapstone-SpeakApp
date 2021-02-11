using SpeakApp.Data;
using SpeakApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakApp.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.User
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public List<User> AllUsers()
        {
            var users = _context.User.Select(user => user).ToList();
            return users;
        }

        public void DeleteUser(int userId)
        {
            var user = _context.User.FirstOrDefault(u => u.Id == userId);
            _context.Remove(user);
            _context.SaveChanges();
        }
    }
}
