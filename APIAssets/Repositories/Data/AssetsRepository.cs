using APIAssets.Context;
using APIAssets.Models;
using APIAssets.ViewModels;
using System.Linq;

namespace APIAssets.Repositories.Data
{
    public class AssetsRepository : GeneralRepository<AppDbContext, Asset, int>
    {
        public AssetsRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            
        }
    }
}
