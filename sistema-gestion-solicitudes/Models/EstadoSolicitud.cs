using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models;

public partial class EstadoSolicitud
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();


}
