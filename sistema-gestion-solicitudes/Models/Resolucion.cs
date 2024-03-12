using Microsoft.CodeAnalysis;


namespace sistema_gestion_solicitudes.Models
{
    public partial class Resolucion
    {

        public int Id { get; set; }
        public DateTime? FechaEmision { get; set; }
        public int SolicitudId { get; set; }
        public int ArchivoId { get; set; }
        public Archivo? Archivo { get; set; }
        public string? Observacion { get; set; }

    }
}
