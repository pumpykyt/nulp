using Microsoft.EntityFrameworkCore.Migrations;

namespace lpnu.Migrations
{
    public partial class lessonteachernamefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeacherName",
                table: "Lessons");

            migrationBuilder.AddColumn<string>(
                name: "TeacherName",
                table: "Subjects",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeacherName",
                table: "Subjects");

            migrationBuilder.AddColumn<string>(
                name: "TeacherName",
                table: "Lessons",
                type: "text",
                nullable: true);
        }
    }
}
