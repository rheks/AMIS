using BC = BCrypt.Net.BCrypt;
using APIAssets.Context;
using APIAssets.Models;
using APIAssets.ViewModels;
using System;
using System.Linq;

namespace APIAssets.Repositories.Data
{
    public class EmployeesRepository : GeneralRepository<AppDbContext, Employee, string>
    {
        private readonly AppDbContext appDbContext;
        public EmployeesRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            this.appDbContext = appDbContext;
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

        public int Login(User user)
        {
            var response = appDbContext.Users.SingleOrDefault(e => e.NIK == user.NIK);
            if (response == null || !BC.Verify(user.Password, response.Password))
            {
                return 0;
            }
            return 1;
        }

        public int Logout()
        {
            return 1;
        }
    }
}
