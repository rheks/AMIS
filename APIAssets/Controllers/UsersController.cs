using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIAssets.Controllers
{
    public class UsersController : BaseController<User, UsersRepository, string>
    {
        public UsersController(UsersRepository usersRepository) : base(usersRepository)
        {

        }
    }
}
