﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakApp.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public int ChatId { get; set; }
        public int UserId { get; set; }
        public string DisplayName { get; set; }
        public string UserImage { get; set; }
        public DateTime DateCreated { get; set; }
        public Boolean Edit { get; set; }
        public Boolean Pinned { get; set; }
    }
}
