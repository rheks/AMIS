using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIAssets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : BaseController<Asset, AssetsRepository, int>
    {
        public AssetsController(AssetsRepository assetsRepository) : base(assetsRepository)
        {

        }
    }
}
