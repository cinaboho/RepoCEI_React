using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sistema_gestion_solicitudes.Migrations
{
    /// <inheritdoc />
    public partial class CambioRelacionNotificaUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotificacionesUser");

            migrationBuilder.AddColumn<int>(
                name: "RecibeId",
                table: "Notificaciones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notificaciones_RecibeId",
                table: "Notificaciones",
                column: "RecibeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notificaciones_T_User_RecibeId",
                table: "Notificaciones",
                column: "RecibeId",
                principalTable: "T_User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notificaciones_T_User_RecibeId",
                table: "Notificaciones");

            migrationBuilder.DropIndex(
                name: "IX_Notificaciones_RecibeId",
                table: "Notificaciones");

            migrationBuilder.DropColumn(
                name: "RecibeId",
                table: "Notificaciones");

            migrationBuilder.CreateTable(
                name: "NotificacionesUser",
                columns: table => new
                {
                    NotificacionesId = table.Column<int>(type: "int", nullable: false),
                    RecibeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificacionesUser", x => new { x.NotificacionesId, x.RecibeId });
                    table.ForeignKey(
                        name: "FK_NotificacionesUser_Notificaciones_NotificacionesId",
                        column: x => x.NotificacionesId,
                        principalTable: "Notificaciones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NotificacionesUser_T_User_RecibeId",
                        column: x => x.RecibeId,
                        principalTable: "T_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_NotificacionesUser_RecibeId",
                table: "NotificacionesUser",
                column: "RecibeId");
        }
    }
}
