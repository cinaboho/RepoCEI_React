using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sistema_gestion_solicitudes.Migrations
{
    /// <inheritdoc />
    public partial class universidadTerminos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "aceptoTerminos",
                table: "T_User",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "aceptoUsoApp",
                table: "T_User",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "universidad",
                table: "T_User",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "aceptoTerminos",
                table: "T_User");

            migrationBuilder.DropColumn(
                name: "aceptoUsoApp",
                table: "T_User");

            migrationBuilder.DropColumn(
                name: "universidad",
                table: "T_User");
        }
    }
}
