using APIAssets.Context;
using APIAssets.Models;

namespace APIAssets.Repositories.Data
{
    public class RolesRepository : GeneralRepository<AppDbContext, Role, int>
    {
        public RolesRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
    }
}
