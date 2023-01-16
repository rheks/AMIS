using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using WebAssets.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using WebAssets.ViewModels;
using System.Net.Mail;
using System.Net;

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
            if (userLogin == null || !BC.Verify(login.Password, userLogin.PasswordUser))
            {
                TempData["Message"] = "NIK or password is invalid";
                TempData["Status"] = "danger";
                return View();
            }
            HttpContext.Session.SetString("NIK", userLogin.NIK);
            HttpContext.Session.SetString("Name", userLogin.Employee.FirstName + " " + userLogin.Employee.LastName);
            HttpContext.Session.SetString("Role", userLogin.Employee.Role.Name);

            if (userLogin.Password == userLogin.PasswordUser)
            {
                var menuProfile = "<a href=\"Profile\"" +
                                  "<b>Profile</b>\r\n" +
                                  "</a>";
                TempData["Message"] = $"Hello {HttpContext.Session.GetString("Name")}, <b>your password still default</b>. Please change your password immediately on menu {menuProfile}";
                TempData["Status"] = "warning";
            }

            if (HttpContext.Session.GetString("Role") == "Employee")
            {
                return RedirectToAction("Home", "Dashboard", new { area = "" });
            }
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

        public static string RandomPassword(int length)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[length];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new String(stringChars);
        }

        public static void sendEmailResetPassword(string toEmail, string NIK, string Name, string generatePassword)
        {
            string fromEmail = "andre.ktsr9@gmail.com";
            string fromPassword = "umzunoyxgyhqaiql";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromEmail);
            message.Subject = "Reset Password | Berca Assets Manageement";
            message.To.Add(new MailAddress(toEmail));
            message.Body = $"<html>" +
                $"\r\n<body width=\"100%\" style=\"margin: 0; padding: 0 !important; background: #f3f3f5; mso-line-height-rule: exactly;\">\r\n" +
                $"<center style=\"width: 100%; background: #f3f3f5;\">\r\n" +
                $"<div class=\"email-container\" style=\"max-width: 680px; margin: 0 auto;\">\r\n" +
                $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"max-width: 680px; width:100%\">\r\n" +
                $"<tr>\r\n" +
                $"<td style=\"padding: 30px; background-color: #ffffff;\" class=\"sm-p bar\">\r\n" +
                $"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"width:100%;\">\r\n" +
                $"<tr>\r\n" +
                $"<td style=\"padding-bottom: 15px; font-family: arial, sans-serif; font-size: 15px; line-height: 21px; color: #3C3F44; text-align: left;\">\r\n" +
                $"<h1 style=\"font-weight: bold; font-size: 21px; line-height: 27px; color: #0C0D0E; margin: 0 0 15px 0;\">Hello, {Name}</h1>\r\n" +
                $"<p style=\"margin: 0 0 15px;\" class=\"has-markdown\">Congratulations, your password has been reset by the Berca Asset Management Website System. Please re-login to the website with the account data below.</p>\r\n" +
                $"<ul style=\"padding: 0; margin: 0; list-style-type: disc;\">\r\n" +
                $"<li style=\"margin:0 0 10px 30px;\">NIK : <b>{NIK}</b></li>\r\n" +
                $"<li style=\"margin:0 0 10px 30px;\">Password : <b>{generatePassword}</b></li>\r\n" +
                $"</ul>\r\n" +
                $"</td>\r\n" +
                $"</tr>\r\n" +
                $"</table>\r\n" +
                $"</td>\r\n" +
                $"</tr>\r\n" +
                $"</table>\r\n" +
                $"</div>\r\n" +
                $"</center>\r\n" +
                $"</body>\r\n" +
                $"</html>";
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, fromPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
        }

        [HttpGet]
        public IActionResult ResetPassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ResetPassword(ResetPasswordVM reset)
        {            
            User employeeReset = webDbContext.Users.Find(reset.NIK);
            if (employeeReset == null)
            {
                TempData["Message"] = "NIK is invalid";
                TempData["Status"] = "danger";
                return View();
            } else if (employeeReset.Employee.Email != reset.Email)
            {
                TempData["Message"] = "Email is invalid";
                TempData["Status"] = "danger";
                return View();
            }

            var generatePassword = RandomPassword(10);
            var HashPassword = BC.HashPassword(generatePassword);
            employeeReset.NIK = reset.NIK;
            employeeReset.Password = HashPassword;
            employeeReset.PasswordUser = HashPassword;

            webDbContext.Entry(employeeReset).State = EntityState.Modified;
            var response = webDbContext.SaveChanges();

            sendEmailResetPassword(employeeReset.Employee.Email, reset.NIK, employeeReset.Employee.FirstName, generatePassword);

            if (response == 1)
            {
                TempData["Message"] = "Reset password successful, Please check your email";
                TempData["Status"] = "success";
                return RedirectToAction("Login");
            } else
            {
                TempData["Message"] = "Reset password failed";
                TempData["Status"] = "danger";
                return View();
            }
        }
    }
}
