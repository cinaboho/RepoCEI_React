using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models
{
    public partial class TipoArchivo
    {

        public int Id { get; set; }

        public string Nombre { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Archivo> Archivos { get; set; } = new List<Archivo>();

    }
}
