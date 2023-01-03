using APIAssets.Context;
using APIAssets.Models;
using APIAssets.ViewModels;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Linq;

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
            Asset assets = appDbContext.Assets.SingleOrDefault(a => a.Id == borrowAsset.Asset_Id);
            assets.Stock = assets.Stock - borrowAsset.Quantity;
            appDbContext.Entry(assets).State = EntityState.Modified;
            appDbContext.SaveChanges();

            var BA = new BorrowAsset();
            BA.NIK = borrowAsset.NIK;
            BA.Asset_Id = borrowAsset.Asset_Id;
            BA.Quantity = borrowAsset.Quantity;
            BA.Status = borrowAsset.Status;
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
