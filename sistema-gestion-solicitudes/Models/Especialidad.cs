using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models;

public partial class Especialidad
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public bool Estado { get; set; }


    [JsonIgnore]
    public virtual ICollection<User> Usuarios { get; set; } = new List<User>();

}
