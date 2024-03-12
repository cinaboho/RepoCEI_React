using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models
{
    public partial class Anexo
    {
        public int Id { get; set; }
        public int SolicitudDetalleId { get; set; }
        [JsonIgnore]
        public SolicitudDetalle? SolicitudDetalle { get; set; } 
        public DateTime? FechaUltimaModificacion { get; set; }

        public ICollection<AnexoField> AnexosField { get; } = new List<AnexoField>();

        public int TipoAnexoId { get; set; }
        public virtual TipoAnexo? TipoAnexo { get; set; }



    }
}
