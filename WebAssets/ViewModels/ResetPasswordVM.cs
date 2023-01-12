using Microsoft.EntityFrameworkCore;

namespace WebAssets.ViewModels
{
    [Keyless]
    public class ResetPasswordVM
    {
        public string NIK { get; set; }
        public string Email { get; set; }
    }
}
