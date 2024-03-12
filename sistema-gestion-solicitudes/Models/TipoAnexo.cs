using System.Text.Json.Serialization;
namespace sistema_gestion_solicitudes.Models
{
    public partial class TipoAnexo
    {

        public int Id { get; set; }
        public string TituloPrincipal { get; set; } = null!;
        public string Subtitulo { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Anexo> Anexos { get; set; } = new List<Anexo>();

    }
}
