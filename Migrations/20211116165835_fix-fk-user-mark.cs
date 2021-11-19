using Microsoft.EntityFrameworkCore.Migrations;

namespace lpnu.Migrations
{
    public partial class fixfkusermark : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MarkUser");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Marks",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Marks_UserId",
                table: "Marks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Marks_AspNetUsers_UserId",
                table: "Marks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Marks_AspNetUsers_UserId",
                table: "Marks");

            migrationBuilder.DropIndex(
                name: "IX_Marks_UserId",
                table: "Marks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Marks");

            migrationBuilder.CreateTable(
                name: "MarkUser",
                columns: table => new
                {
                    MarksId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MarkUser", x => new { x.MarksId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_MarkUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MarkUser_Marks_MarksId",
                        column: x => x.MarksId,
                        principalTable: "Marks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MarkUser_UsersId",
                table: "MarkUser",
                column: "UsersId");
        }
    }
}
