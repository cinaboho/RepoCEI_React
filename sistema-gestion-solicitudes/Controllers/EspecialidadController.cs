using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net;
using System.Net.Http;
using Microsoft.OpenApi.Writers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace sistema_gestion_solicitudes.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadController : Controller
    {
        private readonly GestionContext DBContext;

        public EspecialidadController(GestionContext DBContext)
        {
            this.DBContext = DBContext;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Especialidad>>> GetEspecialidades()
        {
            return await DBContext.Especialidades.ToListAsync();
        }




        [HttpGet]
        [Route("/api/EspecialidadesActivas")]
        public async Task<ActionResult<IEnumerable<Especialidad>>> EspecialidadesDisponibles()
        {
            var especialidades = await DBContext.Especialidades
                                       .Where(e => e.Estado == true)
                                       .ToListAsync();
            return especialidades;
        }




        [HttpPost]
        [Route("/api/Especialidad/Create")]
        public async Task<IActionResult> Create(Especialidad especialidad)
        {
            if (!ModelState.IsValid || await DBContext.Especialidades.AnyAsync(x => x.Nombre == especialidad.Nombre))
            {
                return BadRequest();
            }
            else
            {
                DBContext.Especialidades.Add(especialidad);
                DBContext.SaveChanges();
                return Ok();

            }

        }

        [HttpPut]
        [Route("/api/Especialidad/{id}")]
        public async Task<IActionResult> PutSolicitud(int id, Especialidad especialidad)
        {
            if (id != especialidad.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(especialidad).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EspecialidadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }


        private bool EspecialidadExists(int id)
        {
            return (DBContext.Especialidades?.Any(e => e.Id == id)).GetValueOrDefault();
        }



       
        

    }

}
