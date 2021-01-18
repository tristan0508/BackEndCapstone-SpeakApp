using Microsoft.EntityFrameworkCore;
using SpeakApp.Models;

namespace Speak_app.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

       public DbSet<User> User { get; set; }
       public DbSet<Message> Message { get; set; }
       public DbSet<Chat> Chat { get; set; }
       public DbSet<UserChat> UserChat { get; set; }
    }
}
