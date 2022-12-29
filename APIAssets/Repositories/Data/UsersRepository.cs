using APIAssets.Context;
using APIAssets.Models;

namespace APIAssets.Repositories.Data
{
    public class UsersRepository : GeneralRepository<AppDbContext, User, string>
    {
        public UsersRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
    }
}
