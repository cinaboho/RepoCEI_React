using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sistema_gestion_solicitudes.Migrations
{
    /// <inheritdoc />
    public partial class isInvited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInvited",
                table: "T_User",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInvited",
                table: "T_User");
        }
    }
}
