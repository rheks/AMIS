using Microsoft.AspNetCore.Mvc;

namespace WebAssets.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        
        public IActionResult Employees()
        {
            return View();
        }
    }
}
