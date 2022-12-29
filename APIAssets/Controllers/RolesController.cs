using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIAssets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : BaseController<Role, RolesRepository, int>
    {
        public RolesController(RolesRepository rolesRepository) : base(rolesRepository)
        {
        }
    }
}
