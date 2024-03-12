namespace sistema_gestion_solicitudes.Models
{
    public partial class AnexoField
    {

        public int Id { get; set; }

        public string Nombre { get; set; } = null!;

        public string Value { get; set; } = null!;
        public int AnexoId { get; set; }


    }
}
