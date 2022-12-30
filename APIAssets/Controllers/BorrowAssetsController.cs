using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIAssets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowAssetsController : BaseController<BorrowAsset, BorrowAssetsRepository, int>
    {
        public BorrowAssetsController(BorrowAssetsRepository borrowAssetsRepository) : base(borrowAssetsRepository)
        {

        }
    }
}
