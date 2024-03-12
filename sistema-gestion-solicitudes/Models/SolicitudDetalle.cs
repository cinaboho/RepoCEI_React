namespace sistema_gestion_solicitudes.Models
{
    public partial class SolicitudDetalle
    {

        public int Id { get; set; }

        public string Observacion { get; set; } = "";

        public int SolicitudId { get; set; }

        public bool Factibilidad { get; set; } = false;
        public ICollection<Anexo> Anexos { get; } = new List<Anexo>();
        public ICollection<Asignacion> Asignaciones { get; } = new List<Asignacion>();

        public bool OtrosArchivos { get; set; } = false;
        public string ArchivosSolicitados { get; set; } = "";



    }
}
