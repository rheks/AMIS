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

            var user = new User();
            user.NIK = empl.NIK;
            user.Password= BC.HashPassword(registerEmployee.Password);
            appDbContext.Add(user);
            var response = appDbContext.SaveChanges();
            return response;
        }

        [AllowAnonymous]
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
