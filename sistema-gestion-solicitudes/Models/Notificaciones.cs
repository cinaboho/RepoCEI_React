namespace sistema_gestion_solicitudes.Models
{
    public partial class Notificaciones
    {

        public int Id { get; set; }
        public int RecibeId { get; set; }
        public User? Usuario { get; set; }
        public string Envia { get; set; } = null!;
        public string Mensaje { get; set; } = null!;
        public DateTime FechaCreacion { get; set; }
        public bool Notificado { get; set; } = true;
        public bool Visto { get; set; } = false;
        public DateTime? FechaVisto { get; set; }

        

    }
}
