using APIAssets.Context;
using APIAssets.Models;
using APIAssets.ViewModels;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;

namespace APIAssets.Repositories.Data
{
    public class BorrowAssetsRepository : GeneralRepository<AppDbContext, BorrowAsset, int>
    {
        private readonly AppDbContext appDbContext;
        public IConfiguration configuration;

        public BorrowAssetsRepository(IConfiguration configuration, AppDbContext appDbContext) : base(appDbContext)
        {
            this.appDbContext = appDbContext;
            this.configuration = configuration;
        }

        public IEnumerable<BorrowAsset> RequestAssetStatus(int status)
        {
            var reponse = appDbContext.BorrowAssets.Where(a => a.Status == status).ToList();

            return reponse;
        }

        public IEnumerable<BorrowAsset> RequestAssetPending()
        {
            var reponse = appDbContext.BorrowAssets.Where(a => a.Status == 0 || a.Status == 1 || a.Status == 2).ToList();

            return reponse;
        }

        public IEnumerable<MostFrequentlyBorrowAssetsVM> MostFrequentlyBorrowAssets()
        {
            using (SqlConnection connection = new SqlConnection(configuration["ConnectionStrings:APIAssets"]))
            {
                var procdureName = "SP_ReadMostFrequentlyBorrowAssets";
                var response = connection.Query<MostFrequentlyBorrowAssetsVM>(procdureName, commandType: CommandType.StoredProcedure);
                return response;
            }
        }

        //public IEnumerable<BorrowAsset> MostFrequentlyBorrowAssets()
        //{
        //    //var response = (from ba in appDbContext.BorrowAssets
        //    //                join assets in appDbContext.Assets
        //    //                    on ba.Asset_Id equals assets.Id
        //    //                group ba by ba.Asset_Id into g);

        //    var response = appDbContext.BorrowAssets.FromSqlRaw(sqlcommand).ToList();
        //    return response;
        //}

        //public IEnumerable<BorrowAsset> MostFrequentlyBorrowAssets()
        //{
        //    var response = appDbContext.BorrowAssets.OrderByDescending(ba => ba.Assets)
        //        .Take(3).ToList();

        //    return response;
        //}

        public IEnumerable<EmployeesMostFrequentlyBorrowAssetsVM> EmployeesMostFrequentlyBorrowAssets()
        {
            using (SqlConnection connection = new SqlConnection(configuration["ConnectionStrings:APIAssets"]))
            {
                var procdureName = "SP_EmployeesMostFrequentlyBorrowAssets";
                var response = connection.Query<EmployeesMostFrequentlyBorrowAssetsVM>(procdureName, commandType: CommandType.StoredProcedure);
                return response;
            }
        }

        public int RequestAsset(BorrowAsset borrowAsset)
        {
            Asset assets = appDbContext.Assets.SingleOrDefault(a => a.Id == borrowAsset.Asset_Id);
            assets.Stock = assets.Stock - borrowAsset.Quantity;
            appDbContext.Entry(assets).State = EntityState.Modified;
            appDbContext.SaveChanges();

            var BA = new BorrowAsset();
            BA.NIK = borrowAsset.NIK;
            BA.Asset_Id = borrowAsset.Asset_Id;
            BA.Quantity = borrowAsset.Quantity;
            BA.Status = borrowAsset.Status;
            BA.Reason = borrowAsset.Reason;
            BA.Borrowing_Time = borrowAsset.Borrowing_Time;
            BA.Return_Time = borrowAsset.Return_Time;

            appDbContext.Add(BA);
            var response = appDbContext.SaveChanges();

            return response;
        }

        public int ReturnAsset(BorrowAsset borrowAsset)
        {
            Asset assets = appDbContext.Assets.SingleOrDefault(a => a.Id == borrowAsset.Asset_Id);
            assets.Stock = assets.Stock + borrowAsset.Quantity;
            appDbContext.Entry(assets).State = EntityState.Modified;
            appDbContext.SaveChanges();

            appDbContext.Remove(appDbContext.BorrowAssets.Find(borrowAsset.Id));
            var response = appDbContext.SaveChanges();

            return response;
        }
    }
}
