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
    public class TipoAnexosController : ControllerBase
    {
        private readonly GestionContext _context;

        public TipoAnexosController(GestionContext context)
        {
            _context = context;
        }

        // GET: api/TipoAnexos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoAnexo>>> GetTipoAnexo()
        {
          if (_context.TipoAnexo == null)
          {
              return NotFound();
          }
            return await _context.TipoAnexo.ToListAsync();
        }

        // GET: api/TipoAnexos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoAnexo>> GetTipoAnexo(int id)
        {
          if (_context.TipoAnexo == null)
          {
              return NotFound();
          }
            var tipoAnexo = await _context.TipoAnexo.FindAsync(id);

            if (tipoAnexo == null)
            {
                return NotFound();
            }

            return tipoAnexo;
        }

        // PUT: api/TipoAnexos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoAnexo(int id, TipoAnexo tipoAnexo)
        {
            if (id != tipoAnexo.Id)
            {
                return BadRequest();
            }

            _context.Entry(tipoAnexo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoAnexoExists(id))
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

        // POST: api/TipoAnexos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TipoAnexo>> PostTipoAnexo(TipoAnexo tipoAnexo)
        {
          if (_context.TipoAnexo == null)
          {
              return Problem("Entity set 'GestionContext.TipoAnexo'  is null.");
          }
            _context.TipoAnexo.Add(tipoAnexo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoAnexo", new { id = tipoAnexo.Id }, tipoAnexo);
        }

        // DELETE: api/TipoAnexos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoAnexo(int id)
        {
            if (_context.TipoAnexo == null)
            {
                return NotFound();
            }
            var tipoAnexo = await _context.TipoAnexo.FindAsync(id);
            if (tipoAnexo == null)
            {
                return NotFound();
            }

            _context.TipoAnexo.Remove(tipoAnexo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoAnexoExists(int id)
        {
            return (_context.TipoAnexo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
