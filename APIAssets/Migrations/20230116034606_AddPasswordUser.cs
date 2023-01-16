using Microsoft.EntityFrameworkCore.Migrations;

namespace APIAssets.Migrations
{
    public partial class AddPasswordUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordUser",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordUser",
                table: "Users");
        }
    }
}
