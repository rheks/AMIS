using APIAssets.Context;
using APIAssets.Models;
using APIAssets.ViewModels;
using Microsoft.AspNetCore.Components;
using System;

namespace APIAssets.Repositories.Data
{
    public class BorrowAssetsRepository : GeneralRepository<AppDbContext, BorrowAsset, int>
    {
        private readonly AppDbContext appDbContext;
        public BorrowAssetsRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public int RequestAsset(BorrowAsset borrowAsset)
        {
            var BA = new BorrowAsset();
            BA.NIK = borrowAsset.NIK;
            BA.Asset_Id = borrowAsset.Asset_Id;
            BA.Quantity = borrowAsset.Quantity;
            BA.Status = "Pending";
            BA.Borrowing_Time = borrowAsset.Borrowing_Time;
            BA.Return_Time = borrowAsset.Return_Time;
            appDbContext.Add(BA);
            var response = appDbContext.SaveChanges();
            
            return response;
        }
    }
}
