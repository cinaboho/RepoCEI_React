using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using sistema_gestion_solicitudes.Models;

namespace sistema_gestion_solicitudes.Models;

public partial class GestionContext : DbContext
{
    public GestionContext()
    {
    }

    public GestionContext(DbContextOptions<GestionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Especialidad> Especialidades { get; set; }

    public virtual DbSet<EstadoSolicitud> EstadoSolicituds { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }


    public virtual DbSet<Solicitud> Solicituds { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<InvitacionLink> InvitacionLink { get; set; }

    public virtual DbSet<Notificaciones> Notificaciones {  get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    { 
    
        

    }
  

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Especialidad>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Especialidad");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("Nombre");
            entity.Property(e => e.Estado)
                .HasMaxLength(1)
                .HasColumnName("Estado");

        });

        modelBuilder.Entity<EstadoSolicitud>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Estado_Solicitud");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(45)
                .HasColumnName("Nombre");


            entity.HasMany(e => e.Solicitudes)
                   .WithOne(e => e.Estado)
                   .HasForeignKey(e => e.EstadoId)
                   .IsRequired();



        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Permiso");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(55)
                .HasColumnName("Nombre");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Rol");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.MaxUsers).HasColumnName("MaxUsers");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("Nombre");
            entity.Property(e => e.Estado)
                .HasMaxLength(1)
                .HasColumnName("Estado");
            
        });  

        modelBuilder.Entity<Solicitud>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Solicitud");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Apelacion).HasColumnName("Apelacion");
            entity.Property(e => e.Codigo)
                .HasMaxLength(45)
                .HasColumnName("Codigo");
            entity.Property(e => e.FechaCierre)
                .HasColumnType("datetime")
                .HasColumnName("FechaCierre");
            entity.Property(e => e.FechaCreacion)
                .HasColumnType("datetime")
                .HasColumnName("FechaCreacion");
            entity.Property(e => e.FechaRevision)
                .HasColumnType("datetime")
                .HasColumnName("FechaRevision");
            
            entity.HasOne(e => e.Resolucion)
                  .WithOne()
                  .HasForeignKey<Resolucion>(e => e.SolicitudId)
                  .IsRequired();

            entity.HasOne(e => e.SolicitudDetalle)
                 .WithOne()
                 .HasForeignKey<SolicitudDetalle>(e => e.SolicitudId)
                 .IsRequired();

          

        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_User");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Apellidos).HasMaxLength(100);
            entity.Property(e => e.ContrasenaHash).HasMaxLength(30);
            entity.Property(e => e.Correo).HasMaxLength(100);
            entity.Property(e => e.Username).HasMaxLength(15);
            entity.Property(e => e.FechaCreacion).HasColumnType("timestamp");
            entity.Property(e => e.FechaUltimoLogin).HasColumnType("timestamp");
            entity.Property(e => e.Nombres).HasMaxLength(100);

            entity.HasMany(e => e.Roles)
            .WithMany(e => e.Usuarios)
            .UsingEntity(
            "RoleUser",
            l => l.HasOne(typeof(Role)).WithMany().HasForeignKey("RoleId").HasPrincipalKey(nameof(Role.Id)),
            r => r.HasOne(typeof(User)).WithMany().HasForeignKey("UserId").HasPrincipalKey(nameof(User.Id)),
            j => j.HasKey("RoleId", "UserId"));

            entity.HasMany(e => e.Especialidades)
           .WithMany(e => e.Usuarios);

            entity.HasMany(e => e.Notificaciones)
            .WithOne(e => e.Usuario)
            .HasForeignKey(e => e.RecibeId)
            .IsRequired();



            entity.HasMany(e => e.Solicitudes)
            .WithOne(e => e.Usuario)
            .HasForeignKey(e => e.UsuarioId)
            .IsRequired();




        });

        modelBuilder.Entity<Resolucion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Resolucion");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.FechaEmision)
               .HasColumnType("datetime")
               .HasColumnName("FechaEmision");
            entity.Property(e => e.Observacion)
                .HasColumnName("Observacion");

            entity.HasOne(s => s.Archivo)
                .WithOne()
                .HasForeignKey<Resolucion>(p => p.ArchivoId)
                .IsRequired();


        });

        modelBuilder.Entity<SolicitudDetalle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.ToTable("T_Solicitud_Detalle");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Observacion)
                .HasColumnName("Observacion");

            entity.Property(e => e.OtrosArchivos)
                .HasMaxLength(1)
                .HasColumnName("OtrosArchivos");

            entity.Property(e => e.ArchivosSolicitados)
               .HasColumnName("ArchivosSolicitados");

            entity.Property(e => e.Factibilidad)
                .HasMaxLength(1)
                .HasColumnName("Factibilidad");

            entity.HasMany(e => e.Anexos)
                  .WithOne(e => e.SolicitudDetalle)
                  .HasForeignKey(e => e.SolicitudDetalleId)
                  .IsRequired();

         
        });

        modelBuilder.Entity<TipoSolicitud>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.ToTable("T_Tipo_Solicitud");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("Nombre");
            entity.Property(e => e.DiasPlazo)
            .HasColumnName("DiasPlazo");



        });

        modelBuilder.Entity<Anexo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("id");
            entity.ToTable("T_Anexo");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.FechaUltimaModificacion)
                .HasColumnType("timestamp");

            entity.HasMany(e => e.AnexosField)
                .WithOne()
                .HasForeignKey(e => e.AnexoId)
                .IsRequired();



        });

        modelBuilder.Entity<AnexoField>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Id");
            entity.ToTable("T_AnexoField");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasColumnName("Nombre");
            entity.Property(e => e.Value)
                .HasColumnName("Value");

        });

        modelBuilder.Entity<TipoAnexo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Id");
            entity.ToTable("T_Tipo_Anexo");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.TituloPrincipal)
                .HasColumnName("TituloPrincipal");
            entity.Property(e => e.Subtitulo)
                .HasColumnName("Subtitulo");

            entity.HasMany(e => e.Anexos)
                  .WithOne(e => e.TipoAnexo)
                  .HasForeignKey(e => e.TipoAnexoId)
                  .IsRequired();


        });

        modelBuilder.Entity<Asignacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("id");
            entity.ToTable("T_Asignacion");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FechaAsignacion)
               .HasColumnType("timestamp");
            entity.Property(e => e.FechaEntrega)
               .HasColumnType("timestamp");
            
            entity.HasOne<Archivo>()
                .WithOne()
                .HasForeignKey<Asignacion>(p => p.ArchivoId);

        });


        modelBuilder.Entity<Archivo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Archivo");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasColumnName("Nombre");
            entity.Property(e => e.URL)
                .HasColumnName("Url");
            entity.Property(e => e.Extension)
               .HasColumnName("Extension");
            entity.Property(e => e.FechaCreacion)
                .HasColumnType("timestamp");
            entity.Property(e => e.NumeroDescargas);

        });


        modelBuilder.Entity<TipoArchivo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("T_Tipo_Archivo");

            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(75)
                .HasColumnName("Nombre");


            entity.HasMany(e => e.Archivos)
                   .WithOne(e => e.TipoArchivo)
                   .HasForeignKey(e => e.TipoArchivoId)
                   .IsRequired();



        });

        modelBuilder.Entity<Notificaciones>(entity =>
        {
            // Configura la llave primaria
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.Property(e => e.Id).HasColumnName("Id");

       
            // Configura la propiedad Envia como requerida
            entity.Property(e => e.Envia)
                .IsRequired();

            // Configura la propiedad Mensaje como requerida
            entity.Property(e => e.Mensaje)
                .IsRequired();

            // Configura la propiedad FechaCreacion para generarla en la base de datos al insertar
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            // Configura la propiedad Notificado con un valor predeterminado
            entity.Property(e => e.Notificado)
                .HasDefaultValue(true);

            // Configura la propiedad Visto con un valor predeterminado
            entity.Property(e => e.Visto)
                .HasDefaultValue(false);

            // Configura la propiedad FechaVisto para que sea opcional
            entity.Property(e => e.FechaVisto)
                .IsRequired(false);
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public DbSet<sistema_gestion_solicitudes.Models.SolicitudDetalle>? SolicitudDetalle { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.Anexo>? Anexo { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.Archivo>? Archivo { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.TipoAnexo>? TipoAnexo { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.AnexoField>? AnexoField { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.TipoSolicitud>? TipoSolicitud { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.Asignacion>? Asignacion { get; set; }

    public DbSet<sistema_gestion_solicitudes.Models.Resolucion>? Resolucion { get; set; }
}
