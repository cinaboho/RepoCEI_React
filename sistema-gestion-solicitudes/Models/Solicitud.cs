using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;

namespace sistema_gestion_solicitudes.Models;

public partial class Solicitud
{
    public int Id { get; set; }

    public string? Codigo { get; set; }

    public string? Titulo { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaRevision { get; set; }

    public DateTime? FechaCierre { get; set; }

    public DateTime? FechaResolucion { get; set; }

    public bool? Apelacion { get; set; }

    //Navigation properties for User

    public int UsuarioId { get; set; }
    public User? Usuario { get; set; }

    //Navigation properties for Resolucion

    public virtual Resolucion? Resolucion { get; set; }

    //Navigation properties for SolicitudDetalle

    public virtual SolicitudDetalle? SolicitudDetalle { get; set; }

    //Navigation properties for EstadoSolicitud


    public int EstadoId { get; set; }
    public virtual EstadoSolicitud? Estado { get; set; } = null!;





}
