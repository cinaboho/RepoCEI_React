using System.Text.Json.Serialization;
namespace sistema_gestion_solicitudes.Models;


public partial class InvitacionLink
{
    public int Id { get; set; }
    public string Link { get; set; } = null!;
    public string correo { get; set; } = null!;

    public string code { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public bool Estado { get; set; }
}
