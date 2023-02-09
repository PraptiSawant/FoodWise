using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SearchRecipes.Migrations
{
    public partial class Sixth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_EmailId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "User_Id",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_EmailId",
                table: "Users",
                column: "EmailId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_EmailId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "User_Id",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmailId",
                table: "Users",
                column: "EmailId",
                unique: true);
        }
    }
}
