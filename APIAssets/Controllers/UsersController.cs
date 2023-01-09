using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using APIAssets.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace APIAssets.Controllers
{
    public class UsersController : BaseController<User, UsersRepository, string>
    {
        private readonly UsersRepository usersRepository;
        public UsersController(UsersRepository usersRepository) : base(usersRepository)
        {
            this.usersRepository = usersRepository;
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult UpdatePassword(User user)
        {
            var response = usersRepository.UpdatePassword(user);
            if (response == 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.Created, Message = "Password successfully updated", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Password failed to update", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }
    }
}
