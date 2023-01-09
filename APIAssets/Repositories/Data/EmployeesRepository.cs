using BC = BCrypt.Net.BCrypt;
using APIAssets.Context;
using APIAssets.Models;
using APIAssets.ViewModels;
using System;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace APIAssets.Repositories.Data
{
    public class EmployeesRepository : GeneralRepository<AppDbContext, Employee, string>
    {
        private readonly AppDbContext appDbContext;
        //private readonly AppSettings appSettings;
        public EmployeesRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            this.appDbContext = appDbContext;
            //this.appSettings = appSettings;
        }

        public static string RandomString(int length)
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

        public static void sendEmail(string toEmail, string NIK, string Name, string generatePassword)
        {
            string fromEmail = "andre.ktsr9@gmail.com";
            string fromPassword = "umzunoyxgyhqaiql";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromEmail);
            message.Subject = "Admin Berca Assets Manageement";
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
                $"<p style=\"margin: 0 0 15px;\" class=\"has-markdown\">Congratulations, your account has been created by the Berca Asset Management admin. Please enter the website with the account data below.</p>\r\n" +
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

        public string GenerateNIK()
        {
            var lastNIK = "";
            var newNIK = appDbContext.Employees.ToList().Count() + 1;

            if (newNIK >= 1 && newNIK <= 9)
            {
                lastNIK = "000" + Convert.ToString(newNIK);
            }
            else if (newNIK >= 10 && newNIK <= 99)
            {
                lastNIK = "00" + Convert.ToString(newNIK);
            }
            else if (newNIK >= 100 && newNIK <= 999)
            {
                lastNIK = "0" + Convert.ToString(newNIK);
            }

            DateTime dateTime = DateTime.UtcNow.Date;
            lastNIK = dateTime.ToString("yyyyddMM") + lastNIK;
            return lastNIK;
        }

        public int Register(RegisterEmployee registerEmployee)
        {
            var newNIK = GenerateNIK();
            if (appDbContext.Employees.SingleOrDefault(e => e.Email == registerEmployee.Email) != null)
            {
                return 2;
            }
            else if (appDbContext.Employees.SingleOrDefault(e => e.Phone == registerEmployee.Phone) != null)
            {
                return 3;
            }

            var empl = new Employee();
            empl.NIK = newNIK;
            empl.FirstName= registerEmployee.FirstName;
            empl.LastName= registerEmployee.LastName;
            empl.BirthOfDate = registerEmployee.BirthOfDate;
            empl.Gender = (Models.Gender)registerEmployee.Gender;
            empl.Address = registerEmployee.Address;
            empl.Phone= registerEmployee.Phone;
            empl.Email= registerEmployee.Email;
            empl.Role_Id = registerEmployee.Role_Id;
            empl.Departement_Id = registerEmployee.Departement_Id;
            appDbContext.Add(empl);
            appDbContext.SaveChanges();

            var generatePassword = RandomString(10);
            var user = new User();
            user.NIK = empl.NIK;
            user.Password = BC.HashPassword(generatePassword);
            appDbContext.Add(user);
            var response = appDbContext.SaveChanges();

            sendEmail(registerEmployee.Email, newNIK, registerEmployee.FirstName, generatePassword);
            return response;
        }

        //[AllowAnonymous]
        public LoginEmployee Login([FromBody] LoginEmployee loginEmployee)
        {
            var response = appDbContext.Users.SingleOrDefault(e => e.NIK == loginEmployee.NIK);
            if (response == null || !BC.Verify(loginEmployee.Password, response.Password))
            {
                return null;
            }

            // JWT Tokens
            var timeNow = DateTime.Now;
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Encoding.ASCII.GetBytes("aiwjcnoiwnvwpejkv0wejiow4OISENWEJW0J0J249IKF9024UEJ0FU");
            var tokenDiscriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim(ClaimTypes.Name, response.Employee.FirstName + " " + response.Employee.LastName),
                    new Claim(ClaimTypes.Email, response.Employee.Email),
                    new Claim(ClaimTypes.Role, response.Employee.Role.Name),
                }),
                Expires = timeNow.AddMinutes(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDiscriptor);

            var loggedUser = new LoginEmployee();
            loggedUser.NIK = response.NIK;
            loggedUser.Email = response.Employee.Email;
            loggedUser.Password = response.Password;
            loggedUser.Role = response.Employee.Role.Name;
            loggedUser.Token = tokenHandler.WriteToken(token);
            loggedUser.TokenExpires = timeNow.AddMinutes(4);
            return loggedUser;
        }

        public int Logout()
        {
            return 1;
        }
    }
}
