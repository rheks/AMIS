using APIAssets.Context;
using APIAssets.Models;

namespace APIAssets.Repositories.Data
{
    public class DepartementsRepository : GeneralRepository<AppDbContext, Departement, int>
    {
        public DepartementsRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
    }
}
