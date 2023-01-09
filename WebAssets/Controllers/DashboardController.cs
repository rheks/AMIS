using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAssets.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            else
            {
                ViewBag.nik = HttpContext.Session.GetString("NIK");
                ViewBag.name = HttpContext.Session.GetString("Name");
                ViewBag.role = HttpContext.Session.GetString("Role");

                if (HttpContext.Session.GetString("Role") == "Employee")
                {
                    return RedirectToAction("Home");
                }
            }
            return View();
        }
        
        public IActionResult Home()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            else
            {
                ViewBag.nik = HttpContext.Session.GetString("NIK");
                ViewBag.name = HttpContext.Session.GetString("Name");
                ViewBag.role = HttpContext.Session.GetString("Role");

                if (HttpContext.Session.GetString("Role") != "Employee")
                {
                    return RedirectToAction("Index");
                }
            }
            return View();
        }
        
        public IActionResult Employees()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {                
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");

            if (HttpContext.Session.GetString("Role") != "Admin")
            {
                return RedirectToAction("Index");
            }

            return View();
        }
        
        public IActionResult Departements()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Admin")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult Assets()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Admin")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult Roles()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Admin")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult BorrowAssets()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Admin")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult RequestAssets()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Employee")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult RequestAssetsManager()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Manager")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult RequestAssetsManagerAsset()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            if (HttpContext.Session.GetString("Role") != "Manager Asset")
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        
        public IActionResult Profile()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            ViewBag.nik = HttpContext.Session.GetString("NIK");
            ViewBag.name = HttpContext.Session.GetString("Name");
            ViewBag.role = HttpContext.Session.GetString("Role");
            return View();
        }
    }
}
