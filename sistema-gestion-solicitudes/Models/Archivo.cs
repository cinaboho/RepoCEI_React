namespace sistema_gestion_solicitudes.Models
{
    public partial class Archivo
    {

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public int SolicitudDetalleId { get; set; }
        public string URL { get; set; } = null!;
        public DateTime FechaCreacion { get; set; }
        public int NumeroDescargas{ get; set; }
        public string Extension { get; set; } = null!;
        public int UsuarioId { get; set; }
        public User? Usuario { get; set; } 
        public int TipoArchivoId { get; set; }
        public TipoArchivo? TipoArchivo { get; set; }

    }
}
