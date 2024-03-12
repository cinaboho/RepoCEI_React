using System;
using System.Collections.Generic;

namespace sistema_gestion_solicitudes.Models;

public partial class Permission
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Role> Roles { get; set; }
}
