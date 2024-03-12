
using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models;

public partial class User
{
    public int Id { get; set; }
    public string Nombres { get; set; } = null!;
    public string Apellidos { get; set; } = null!;
    public string Correo { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string universidad { get; set; } = null!;

    public bool aceptoUsoApp { get; set; }
    public bool aceptoTerminos { get; set; }

    public string? ContrasenaHash { get; set; } = null!;
    public int Cedula { get; set; }
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaUltimoLogin { get; set; }

    public bool IsInvited { get; set; }

    public bool Estado { get; set; }
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    public virtual ICollection<Especialidad> Especialidades { get; set; } = new List<Especialidad>();

    [JsonIgnore]
    public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();


    [JsonIgnore]
    public virtual ICollection<Archivo> Archivos { get; set; } = new List<Archivo>();

    [JsonIgnore]
    public virtual ICollection<Notificaciones> Notificaciones { get; set; } = new List<Notificaciones>();



}
