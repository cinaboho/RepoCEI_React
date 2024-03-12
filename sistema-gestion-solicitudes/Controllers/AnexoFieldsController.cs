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
    public class AnexoFieldsController : ControllerBase
    {
        private readonly GestionContext DBContext;

        public AnexoFieldsController(GestionContext context)
        {
            DBContext = context;
        }

        // GET: api/AnexoFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnexoField>>> GetAnexoField()
        {
            if (DBContext.AnexoField == null)
            {
                return NotFound();
            }
            return await DBContext.AnexoField.ToListAsync();
        }

        // GET: api/AnexoFields/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnexoField>> GetAnexoField(int id)
        {
            if (DBContext.AnexoField == null)
            {
                return NotFound();
            }
            var anexoField = await DBContext.AnexoField.FindAsync(id);

            if (anexoField == null)
            {
                return NotFound();
            }

            return anexoField;
        }

        // PUT: api/AnexoFields/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnexoField(int id, AnexoField anexoField)
        {
            if (id != anexoField.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(anexoField).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnexoFieldExists(id))
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

        // POST: api/AnexoFields
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<AnexoField>> PostAnexoField(List<AnexoField> fields)
        {
            if (DBContext.AnexoField == null)
            {
                return BadRequest();
            }

            int anexoId = 0;

            foreach (AnexoField field in fields)
            {
                if (anexoId == 0)
                {
                    anexoId = field.AnexoId;
                }
                DBContext.AnexoField.Add(new AnexoField { Nombre = field.Nombre, Value = field.Value, AnexoId = field.AnexoId });
                await DBContext.SaveChangesAsync();

            }

            var newfields = await DBContext.AnexoField.Where(s => s.AnexoId == anexoId).ToListAsync();


            return StatusCode(200, newfields);
        }


        // DELETE: api/AnexoFields/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnexoField(int id)
        {
            if (DBContext.AnexoField == null)
            {
                return NotFound();
            }
            var anexoField = await DBContext.AnexoField.FindAsync(id);
            if (anexoField == null)
            {
                return NotFound();
            }

            DBContext.AnexoField.Remove(anexoField);
            await DBContext.SaveChangesAsync();

            return NoContent();
        }

        private bool AnexoFieldExists(int id)
        {
            return (DBContext.AnexoField?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        [HttpPut]
        public async Task<IActionResult> UpdateFields(int idAnexo, List<AnexoField> fieldsList)
        {

            try
            {
                foreach (AnexoField field in fieldsList)
                {
                    idAnexo = field.AnexoId;
                    DBContext.Entry(field).State = EntityState.Modified;
                    await DBContext.SaveChangesAsync();
                }

                try
                {
                    var anexo = DBContext.Anexo?.Find(idAnexo);
                    anexo.FechaUltimaModificacion = DateTime.Now;
                    await DBContext.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }

            }
            catch
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
