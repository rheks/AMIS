using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebAssets.Models;

namespace WebAssets.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            //HttpContext.Session.SetString("Name", "Areks Ryuno");
            //return View();
            return RedirectToPage("/Auth/Login");
        }

        public IActionResult Privacy()
        {
            //ViewBag.sessionv = HttpContext.Session.GetString("Name");
            return View();
        }

        [HttpGet]
        public IActionResult Logout()
        {
            //HttpContext.Session.Clear();
            return RedirectToAction("Privacy");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
