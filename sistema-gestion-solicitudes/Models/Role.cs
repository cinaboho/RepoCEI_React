using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace sistema_gestion_solicitudes.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public int MaxUsers { get; set; }

    public bool Estado { get; set; }

    [JsonIgnore]
    public virtual ICollection<Permission> Permisos { get; set; } = new List<Permission>();

    [JsonIgnore]
    public virtual ICollection<User> Usuarios { get; set; } = new List<User>();
}
