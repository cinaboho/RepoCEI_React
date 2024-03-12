using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_gestion_solicitudes.Models;

namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResolucionController : ControllerBase
    {
        private readonly GestionContext DBContext;

        public ResolucionController(GestionContext context)
        {
            DBContext = context;
        }

        // GET: api/Resolucion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resolucion>>> GetResolucion()
        {
          if (DBContext.Resolucion == null)
          {
              return NotFound();
          }
            return await DBContext.Resolucion.ToListAsync();
        }

        // GET: api/Resolucion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resolucion>> GetResolucion(int id)
        {
          if (DBContext.Resolucion == null)
          {
              return NotFound();
          }
            var resolucion = await DBContext.Resolucion.FindAsync(id);

            if (resolucion == null)
            {
                return NotFound();
            }

            return resolucion;
        }

        // PUT: api/Resolucion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResolucion(int id, Resolucion resolucion)
        {
            if (id != resolucion.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(resolucion).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResolucionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Resolucion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*        [HttpPost]
        public async Task<ActionResult<Resolucion>> PostResolucion(Resolucion resolucion)
        {
          if (DBContext.Resolucion == null)
          {
              return Problem("Entity set 'GestionContext.Resolucion'  is null.");
          }
            DBContext.Resolucion.Add(resolucion);
            await DBContext.SaveChangesAsync();

            return CreatedAtAction("GetResolucion", new { id = resolucion.Id }, resolucion);
        }
        */

        [HttpPost]
        [Route("/api/Resolucion")]
        public async Task<ActionResult<Resolucion>> NewResolucion(Resolucion resolucion)
        {
            if (DBContext.Resolucion == null)
            {
                return Problem("Entity set 'GestionContext.Resolucion'  is null.");
            }
            var resol = new Resolucion { FechaEmision = DateTime.Now, SolicitudId = resolucion.SolicitudId, 
                Observacion = resolucion.Observacion , ArchivoId = resolucion.ArchivoId};
            DBContext.Resolucion.Add(resol);
            await DBContext.SaveChangesAsync();
            return Ok();
        }






        // DELETE: api/Resolucion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResolucion(int id)
        {
            if (DBContext.Resolucion == null)
            {
                return NotFound();
            }
            var resolucion = await DBContext.Resolucion.FindAsync(id);
            if (resolucion == null)
            {
                return NotFound();
            }

            DBContext.Resolucion.Remove(resolucion);
            await DBContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ResolucionExists(int id)
        {
            return (DBContext.Resolucion?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
