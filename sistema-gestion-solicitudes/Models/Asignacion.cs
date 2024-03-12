using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models
{
    public partial class Asignacion
    {
        public int Id { get; set; }
        public int SolicitudDetalleId { get; set; }
        public DateTime? FechaAsignacion { get; set;}
        public DateTime? FechaEntrega { get; set; }
        public int UserAsignadoId { get; set; }
        public User? UserAsignado { get; set; } = null!;
        public int? ArchivoId { get; set; }
        public Archivo? Documento { get; set; }


    }
}
