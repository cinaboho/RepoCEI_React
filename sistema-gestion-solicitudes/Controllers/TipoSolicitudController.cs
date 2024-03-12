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
    public class TipoSolicitudController : ControllerBase
    {
        private readonly GestionContext DBContext;

        public TipoSolicitudController(GestionContext context)
        {
            DBContext = context;
        }

        // GET: api/TipoSolicitud
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoSolicitud>>> GetTipoSolicitud()
        {
          if (DBContext.TipoSolicitud == null)
          {
              return NotFound();
          }
            return await DBContext.TipoSolicitud.ToListAsync();
        }

        // GET: api/TipoSolicitud/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoSolicitud>> GetTipoSolicitud(int id)
        {
          if (DBContext.TipoSolicitud == null)
          {
              return NotFound();
          }
            var tipoSolicitud = await DBContext.TipoSolicitud.FindAsync(id);

            if (tipoSolicitud == null)
            {
                return NotFound();
            }

            return tipoSolicitud;
        }

        // PUT: api/TipoSolicitud/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoSolicitud(int id, TipoSolicitud tipoSolicitud)
        {
            if (id != tipoSolicitud.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(tipoSolicitud).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoSolicitudExists(id))
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

        // POST: api/TipoSolicitud
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TipoSolicitud>> PostTipoSolicitud(TipoSolicitud tipoSolicitud)
        {
          if (DBContext.TipoSolicitud == null)
          {
              return Problem("Entity set 'GestionContext.TipoSolicitud'  is null.");
          }
            DBContext.TipoSolicitud.Add(tipoSolicitud);
            await DBContext.SaveChangesAsync();

            return CreatedAtAction("GetTipoSolicitud", new { id = tipoSolicitud.Id }, tipoSolicitud);
        }

        // DELETE: api/TipoSolicitud/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoSolicitud(int id)
        {
            if (DBContext.TipoSolicitud == null)
            {
                return NotFound();
            }
            var tipoSolicitud = await DBContext.TipoSolicitud.FindAsync(id);
            if (tipoSolicitud == null)
            {
                return NotFound();
            }

            DBContext.TipoSolicitud.Remove(tipoSolicitud);
            await DBContext.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoSolicitudExists(int id)
        {
            return (DBContext.TipoSolicitud?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
