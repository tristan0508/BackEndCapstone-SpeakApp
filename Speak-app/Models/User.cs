using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakApp.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(28, MinimumLength =28)]
        public string FirebaseUserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public Boolean Status { get; set; }
    }
}
