using System;

namespace APIAssets.ViewModels
{
    public class LoginEmployee
    {
        public string NIK { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public DateTime TokenExpires { get; set; }
    }
}
