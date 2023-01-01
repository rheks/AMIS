using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using WebAssets.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace WebAssets.Controllers
{
    public class AuthController : Controller
    {
        private readonly WebDbContext webDbContext;
        public AuthController(WebDbContext webDbContext)
        {
            this.webDbContext = webDbContext;
        }

        [HttpGet]
        public IActionResult Login()
        {
            //IEnumerable<User> users = webDbContext.Users.ToList();
            //return View(users);
            if (
                HttpContext.Session.GetString("NIK") != null ||
                HttpContext.Session.GetString("Name") != null ||
                HttpContext.Session.GetString("Role") != null
            )
            {
                return RedirectToAction("Index", "Dashboard", new { area = "" });
            }
            return View();
        }

        [HttpPost]
        public IActionResult Login(User login)
        {
            User userLogin = webDbContext.Users.Find(login.NIK);
            if (userLogin == null || !BC.Verify(login.Password, userLogin.Password))
            {
                ViewBag.Message = "NIK or password is invalid";
                return View();
            }
            HttpContext.Session.SetString("NIK", userLogin.NIK);
            HttpContext.Session.SetString("Name", userLogin.Employee.FirstName + " " + userLogin.Employee.LastName);
            HttpContext.Session.SetString("Role", userLogin.Employee.Role.Name);
            return RedirectToAction("Index", "Dashboard", new { area = "" });

        }

        [HttpGet]
        public IActionResult Logout()
        {
            if (
                HttpContext.Session.GetString("NIK") == null ||
                HttpContext.Session.GetString("Name") == null ||
                HttpContext.Session.GetString("Role") == null
            )
            {
                return RedirectToAction("Login", "Auth", new { area = "" });
            }
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
