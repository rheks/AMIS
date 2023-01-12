using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using APIAssets.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net;

namespace APIAssets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employee, EmployeesRepository, string>
    {
        private readonly EmployeesRepository employeesRepository;
        public EmployeesController(EmployeesRepository employeesRepository) : base(employeesRepository)
        {
            this.employeesRepository = employeesRepository;
        }

        [HttpPost]
        [Route("Register")]
        public ActionResult Register(RegisterEmployee registerEmployee)
        {
            var response = employeesRepository.Register(registerEmployee);
            
            if (response == 1)
            {
                return StatusCode(201, new { Status = HttpStatusCode.Created, Message = "Data employee successfully registered", Data = response });
            }
            else if (response == 2)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data email is duplicate", Data = response });
            }
            else if (response == 3)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data phone is duplicate", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }
        
        [HttpPut]
        [Route("Register/Update")]
        public ActionResult RegisterUpdate(Employee registerEmployee)
        {
            var response = employeesRepository.RegisterUpdate(registerEmployee);
            
            if (response == 1)
            {
                return StatusCode(201, new { Status = HttpStatusCode.Created, Message = "Data employee successfully updated", Data = response });
            }
            else if (response == 2)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data email is duplicate", Data = response });
            }
            else if (response == 3)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data phone is duplicate", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }

        [HttpPost]
        [Route("Login")]
        public ActionResult Login(LoginEmployee user)
        {
            var response = employeesRepository.Login(user);
            if (response != null)
            {
                return StatusCode(200, new { Status = HttpStatusCode.OK, Message = "Login successfull", Data = response });
            }
            return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "NIK or password is invalid", Data = response });
        }
        
        [HttpGet]
        [Route("Logout")]
        public ActionResult Logout()
        {
            var response = employeesRepository.Logout();
            if (response == 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.OK, Message = "Logout successfull", Data = response });
            }
            return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
        }
    }
}
