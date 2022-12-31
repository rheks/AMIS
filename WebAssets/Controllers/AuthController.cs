using Microsoft.AspNetCore.Mvc;
using WebAssets.Models;

namespace WebAssets.Controllers
{
    public class AuthController : Controller
    {
        //private readonly MVCDbContext mVCDbContext;
        //private readonly DbSet<Login> Log;
        //public AuthController(MVCDbContext mVCDbContext)
        //{
        //    this.mVCDbContext = mVCDbContext;
        //    //Log = mVCDbContext.Set<Login>();
        //}

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        //[HttpPost]
        //public IActionResult Login(Login login)
        //{
        //    Login loggedUser = Log.Where(x => x.NIK == login.NIK && x.Password == login.Password).FirstOrDefault();
        //    if (loggedUser != null)
        //    {
        //        Console.Write("OKee login");
        //        return RedirectToAction("Home.index");
        //    }
        //    return View();
        //}
    }
}
