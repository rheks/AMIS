﻿// <auto-generated />
using System;
using APIAssets.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace APIAssets.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("APIAssets.Models.Asset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Stock")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("APIAssets.Models.BorrowAsset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Asset_Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("Borrowing_Time")
                        .HasColumnType("datetime2");

                    b.Property<string>("NIK")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Reason")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Return_Time")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Asset_Id");

                    b.HasIndex("NIK");

                    b.ToTable("Borrow_Assets");
                });

            modelBuilder.Entity("APIAssets.Models.Departement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NIK_HoD")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("NIK_HoD")
                        .IsUnique()
                        .HasFilter("[NIK_HoD] IS NOT NULL");

                    b.ToTable("Departements");
                });

            modelBuilder.Entity("APIAssets.Models.Employee", b =>
                {
                    b.Property<string>("NIK")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("BirthOfDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Departement_Id")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role_Id")
                        .HasColumnType("int");

                    b.HasKey("NIK");

                    b.HasIndex("Departement_Id");

                    b.HasIndex("Role_Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("APIAssets.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("APIAssets.Models.User", b =>
                {
                    b.Property<string>("NIK")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordUser")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NIK");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("APIAssets.Models.BorrowAsset", b =>
                {
                    b.HasOne("APIAssets.Models.Asset", "Assets")
                        .WithMany("BorrowAssets")
                        .HasForeignKey("Asset_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIAssets.Models.User", "Users")
                        .WithMany("BorrowAssets")
                        .HasForeignKey("NIK");

                    b.Navigation("Assets");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("APIAssets.Models.Departement", b =>
                {
                    b.HasOne("APIAssets.Models.Employee", "EmployeeHoD")
                        .WithOne("DepartementHoD")
                        .HasForeignKey("APIAssets.Models.Departement", "NIK_HoD");

                    b.Navigation("EmployeeHoD");
                });

            modelBuilder.Entity("APIAssets.Models.Employee", b =>
                {
                    b.HasOne("APIAssets.Models.Departement", "Departements")
                        .WithMany("Employees")
                        .HasForeignKey("Departement_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("APIAssets.Models.Role", "Role")
                        .WithMany("Employee")
                        .HasForeignKey("Role_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departements");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("APIAssets.Models.User", b =>
                {
                    b.HasOne("APIAssets.Models.Employee", "Employee")
                        .WithOne("User")
                        .HasForeignKey("APIAssets.Models.User", "NIK")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("APIAssets.Models.Asset", b =>
                {
                    b.Navigation("BorrowAssets");
                });

            modelBuilder.Entity("APIAssets.Models.Departement", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("APIAssets.Models.Employee", b =>
                {
                    b.Navigation("DepartementHoD");

                    b.Navigation("User");
                });

            modelBuilder.Entity("APIAssets.Models.Role", b =>
                {
                    b.Navigation("Employee");
                });

            modelBuilder.Entity("APIAssets.Models.User", b =>
                {
                    b.Navigation("BorrowAssets");
                });
#pragma warning restore 612, 618
        }
    }
}
