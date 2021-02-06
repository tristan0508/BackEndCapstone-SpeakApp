using Speak_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeakApp.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string SenderImage { get; set; }
        public string ReceiverImage { get; set; }
    }
}
