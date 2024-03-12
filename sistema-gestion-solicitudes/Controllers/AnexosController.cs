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
    public class AnexosController : ControllerBase
    {
        private readonly GestionContext DBContext;

        public AnexosController(GestionContext context)
        {
            DBContext = context;
        }

        // GET: api/Anexos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Anexo>>> GetAnexo()
        {
          if (DBContext.Anexo == null)
          {
              return NotFound();
          }
            return await DBContext.Anexo.ToListAsync();
        }



        // GET: api/Anexos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Anexo>> GetAnexo(int id)
        {
          if (DBContext.Anexo == null)
          {
              return NotFound();
          }
            var anexo = await DBContext.Anexo
                            .Where(s => s.Id == id)
                            .Include(s => s.SolicitudDetalle)
                            .Include(s => s.TipoAnexo)
                            .Include(s => s.AnexosField)
                            .FirstAsync();


            if (anexo == null)
            {
                return NotFound();
            }

            return anexo;
        }

        // PUT: api/Anexos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnexo(int id, Anexo anexo)
        {
            if (id != anexo.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(anexo).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnexoExists(id))
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

        // POST: api/Anexos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPost]
        [Route("/api/Anexos")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Anexo>> PostAnexo(Anexo anexo)
        {
            if (DBContext.Anexo == null)
            {
                return BadRequest();
            }



            var newAnexo = new Anexo { SolicitudDetalleId = anexo.SolicitudDetalleId, TipoAnexoId = anexo.TipoAnexoId};

            DBContext.Anexo.Add(newAnexo);
            await DBContext.SaveChangesAsync();
            return StatusCode(200, newAnexo);
            
        }


        [HttpPost]
        [Route("/api/Anexos/Add")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public  ActionResult<Anexo> AddNewAnexo(List<Anexo> anexos)
        {
            if (DBContext.Anexo == null)
            {
                return BadRequest();
            }

            foreach(Anexo anexo in anexos)
            {
                var newAnexo = new Anexo { SolicitudDetalleId = anexo.SolicitudDetalleId, TipoAnexoId = anexo.TipoAnexoId };
                DBContext.Anexo.Add(newAnexo);
                DBContext.SaveChanges();

            }
            return Ok();


        }





        // DELETE: api/Anexos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnexo(int id)
        {
            if (DBContext.Anexo == null)
            {
                return NotFound();
            }
            var anexo = await DBContext.Anexo.FindAsync(id);
            if (anexo == null)
            {
                return NotFound();
            }

            DBContext.Anexo.Remove(anexo);
            await DBContext.SaveChangesAsync();

            return NoContent();
        }

        private bool AnexoExists(int id)
        {
            return (DBContext.Anexo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
