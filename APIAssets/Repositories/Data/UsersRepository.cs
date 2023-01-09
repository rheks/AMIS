using BC = BCrypt.Net.BCrypt;
using APIAssets.Context;
using APIAssets.Models;
using Microsoft.EntityFrameworkCore;
using static Dapper.SqlMapper;

namespace APIAssets.Repositories.Data
{
    public class UsersRepository : GeneralRepository<AppDbContext, User, string>
    {
        private readonly AppDbContext appDbContext;
        public UsersRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public int UpdatePassword(User user)
        {
            var newData = new User();
            newData.NIK = user.NIK;
            newData.Password = BC.HashPassword(user.Password);

            appDbContext.Entry(newData).State = EntityState.Modified;
            var response = appDbContext.SaveChanges();
            return response;
        }
    }
}
