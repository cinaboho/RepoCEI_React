using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;
using static sistema_gestion_solicitudes.Controllers.UserController;


namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacionesController : ControllerBase
    {

        private readonly GestionContext DBContext;
        private readonly ILogger<NotificacionesController> logger;



        public NotificacionesController(GestionContext DBContext, ILogger<NotificacionesController> logger, IEmailSender emailSender)
        {
            this.DBContext = DBContext;
            this.logger=logger;
        }

        public class NewNotificationRequestBody
        {
            public string Envia { get; set; }
            public string Mensaje { get; set; }

            public int SolicitudId { get; set; }

        }

        [HttpGet]
        [Route("/api/notificaciones")]
        public async Task<ActionResult<IEnumerable<Notificaciones>>> GetNotificaciones()
        {
            var notificaciones = await DBContext.Notificaciones
                        .ToListAsync();

            return notificaciones;
        }

        [HttpGet("{idUsuario}")]
        public async Task<ActionResult<IEnumerable<Notificaciones>>> GetNotificaciones(int idUsuario)
        {
            var notificaciones = await DBContext.Notificaciones
                                                .Where(n => n.RecibeId == idUsuario)
                                                .ToListAsync();

            return notificaciones;
        }

        [HttpGet]
        [Route("/api/test")]
        public async Task<ActionResult<IEnumerable<Solicitud>>> GetNotificacionesTest()
        {
            var solicitudes = await DBContext.Solicituds.ToListAsync();

            foreach (var solicitud in solicitudes)
            {
                if (solicitud.FechaCierre < DateTime.Now && solicitud.EstadoId!=8)
                {
                    solicitud.EstadoId = 8;

                    var nuevaNotificacion = new Notificaciones
                    {
                        Envia = "system",
                        Mensaje = "Solicitud " + solicitud.Titulo + " ha sido rechazada por superar fecha de cierre",
                        FechaCreacion = DateTime.Now, // o DateTime.Now dependiendo de tu zona horaria
                        Notificado = true,
                        Visto = false,
                        RecibeId = solicitud.UsuarioId
                    };

                    DBContext.Notificaciones.Add(nuevaNotificacion);
                    await DBContext.SaveChangesAsync();

                }
            }

            await DBContext.SaveChangesAsync();

            return solicitudes;
        }

        [HttpGet]
        [Route("/api/test2")]
        public async Task<ActionResult<IEnumerable<Solicitud>>> GetNotificacionesTest2()
        {
            var solicitudes = await DBContext.Solicituds.ToListAsync();
            var diasMenos = 7;
            foreach (var solicitud in solicitudes)
            {
                if (solicitud.FechaCierre != null)
                {
                    this.logger.LogWarning("FechaCierre: " + solicitud.FechaCierre.Value.Date.ToString());
                    this.logger.LogWarning("Fecha Futura: " + DateTime.Now.AddDays(+diasMenos).Date.ToLocalTime().ToString());

                    var FechaCierre = solicitud.FechaCierre.Value.Date.ToString();
                    var FechaFutura = DateTime.Now.AddDays(+diasMenos).Date.ToLocalTime().ToString();

                    if (FechaCierre== FechaFutura && solicitud.EstadoId != 8 && solicitud.EstadoId != 7)
                    {
                        var nuevaNotificacion = new Notificaciones
                        {
                            Envia = "system",
                            Mensaje = "Solicitud " + solicitud.Titulo + " vence en " + diasMenos.ToString() + " días",
                            FechaCreacion = DateTime.Now, // o DateTime.Now dependiendo de tu zona horaria
                            Notificado = true,
                            Visto = false,
                            RecibeId = solicitud.UsuarioId
                        };

                        DBContext.Notificaciones.Add(nuevaNotificacion);
                        await DBContext.SaveChangesAsync();
                    }
                    

                }
       
            }

            await DBContext.SaveChangesAsync();

            return solicitudes;
        }



        [HttpPut]
        [Route("/api/notificaciones/visto/{id}")]
        public async Task<IActionResult> MarcarVistoNotificacion(int id)
        {
            var notificacion = await DBContext.Notificaciones.FirstOrDefaultAsync(u => u.Id == id);
            if (notificacion == null)
            {
                return NotFound();
            }

            notificacion.Visto= true;

            await DBContext.SaveChangesAsync();
            return Ok();
        }

            [HttpPost]
        [Route("/api/notificaciones/nuevo")]
        public async Task<IActionResult> PostNotificacion([FromBody] NewNotificationRequestBody requestBody)
        {
            try
            {
                
                var envia= requestBody.Envia;
                var mensaje= requestBody.Mensaje;
                var solicitudId = requestBody.SolicitudId;

                var solicitud = DBContext.Solicituds.FirstOrDefault(e => e.Id == solicitudId);
                if(solicitud!=null)
                {
                    var nuevaNotificacion = new Notificaciones
                    {
                        Envia = envia,
                        Mensaje = mensaje,
                        FechaCreacion = DateTime.UtcNow, // o DateTime.Now dependiendo de tu zona horaria
                        Notificado = true,
                        Visto = false,
                        RecibeId = solicitud.UsuarioId
                };

                    DBContext.Notificaciones.Add(nuevaNotificacion);
                    await DBContext.SaveChangesAsync();

                    return Ok();
                }
                else
                {
                    return BadRequest("Falta id de solicitud");
                }
                
                
            }
            catch (DbUpdateException ex)
            {
                // Log the detailed error
                this.logger.LogError("An error occurred while updating the database.", ex);
                // Devuelve una respuesta con el error
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.InnerException?.Message ?? ex.Message });
            }

        }

        
    }


}

