using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace sistema_gestion_solicitudes.Migrations
{
    /// <inheritdoc />
    public partial class RelacionNotificacionesUsuarios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notificaciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Envia = table.Column<string>(type: "longtext", nullable: false),
                    Mensaje = table.Column<string>(type: "longtext", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Notificado = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: (byte)1),
                    Visto = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: (byte)0),
                    FechaVisto = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotificacionesUser");

            migrationBuilder.DropTable(
                name: "Notificaciones");
        }
    }
}
