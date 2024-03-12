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
    public class SolicitudDetallesController : ControllerBase
    {
        private readonly GestionContext _context;

        public SolicitudDetallesController(GestionContext context)
        {
            _context = context;
        }

        // GET: api/SolicitudDetalles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SolicitudDetalle>>> GetSolicitudDetalle()
        {
          if (_context.SolicitudDetalle == null)
          {
              return NotFound();
          }
            return await _context.SolicitudDetalle.ToListAsync();
        }

        // GET: api/SolicitudDetalles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SolicitudDetalle>> GetSolicitudDetalle(int id)
        {
          if (_context.SolicitudDetalle == null)
          {
              return NotFound();
          }
            var solicitudDetalle = await _context.SolicitudDetalle.FindAsync(id);

            if (solicitudDetalle == null)
            {
                return NotFound();
            }

            return solicitudDetalle;
        }

        // PUT: api/SolicitudDetalles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolicitudDetalle(int id, SolicitudDetalle solicitudDetalle)
        {
            if (id != solicitudDetalle.Id)
            {
                return BadRequest();
            }

            _context.Entry(solicitudDetalle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolicitudDetalleExists(id))
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

        // POST: api/SolicitudDetalles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SolicitudDetalle>> PostSolicitudDetalle(SolicitudDetalle solicitudDetalle)
        {
          if (_context.SolicitudDetalle == null)
          {
              return Problem("Entity set 'GestionContext.SolicitudDetalle'  is null.");
          }
            _context.SolicitudDetalle.Add(solicitudDetalle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSolicitudDetalle", new { id = solicitudDetalle.Id }, solicitudDetalle);
        }

        // DELETE: api/SolicitudDetalles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolicitudDetalle(int id)
        {
            if (_context.SolicitudDetalle == null)
            {
                return NotFound();
            }
            var solicitudDetalle = await _context.SolicitudDetalle.FindAsync(id);
            if (solicitudDetalle == null)
            {
                return NotFound();
            }

            _context.SolicitudDetalle.Remove(solicitudDetalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SolicitudDetalleExists(int id)
        {
            return (_context.SolicitudDetalle?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
