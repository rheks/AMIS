using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIAssets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartementsController : BaseController<Departement, DepartementsRepository, int>
    {
        public DepartementsController(DepartementsRepository departementsRepository) : base(departementsRepository)
        {

        }
    }
}
