using Microsoft.AspNetCore.Mvc;

namespace WebAssets.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
