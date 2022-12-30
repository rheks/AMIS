using APIAssets.Models;
using Microsoft.EntityFrameworkCore;

namespace APIAssets.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Departement> Departements { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<BorrowAsset> BorrowAssets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasMany(r => r.Employee)
                .WithOne(e => e.Role);

            modelBuilder.Entity<Departement>()
                .HasOne(e => e.EmployeeHoD)
                .WithOne(d => d.DepartementHoD)
                .HasForeignKey<Departement>(d => d.NIK_HoD);

            modelBuilder.Entity<Departement>()
                .HasMany(e => e.Employees)
                .WithOne(d => d.Departements);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne(u => u.Employee)
                .HasForeignKey<User>(u => u.NIK);

            //modelBuilder.Entity<BorrowAsset>()
            //    .HasKey(ba => new { ba.NIK });

            modelBuilder.Entity<BorrowAsset>()
                .HasOne(ba => ba.Users)
                .WithMany(u => u.BorrowAssets)
                .HasForeignKey(ba => ba.NIK);
            
            modelBuilder.Entity<BorrowAsset>()
                .HasOne(ba => ba.Assets)
                .WithMany(u => u.BorrowAssets)
                .HasForeignKey(ba => ba.Asset_Id);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
