using APIAssets.Context;
using APIAssets.Models;

namespace APIAssets.Repositories.Data
{
    public class BorrowAssetsRepository : GeneralRepository<AppDbContext, BorrowAsset, int>
    {
        public BorrowAssetsRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
    }
}
