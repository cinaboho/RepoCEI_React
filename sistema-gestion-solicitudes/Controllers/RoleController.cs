using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_gestion_solicitudes.Models;

namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

        private readonly GestionContext DBContext;

        public RoleController(GestionContext DBContext)
        {
            this.DBContext = DBContext;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await DBContext.Roles.ToListAsync();
        }

        [HttpGet]
        [Route("/api/RolesActivos")]

        public async Task<ActionResult<IEnumerable<Role>>> GetRolesActivos()
        {
            return await DBContext.Roles.Where(s => s.Estado == true).ToListAsync();
        }



        [HttpPost]
        [Route("/api/Roles/Create")]
        public async Task<IActionResult> Create(Role rol)
        {
            if (!ModelState.IsValid || await DBContext.Roles.AnyAsync(x => x.Nombre == rol.Nombre))
            {
                return BadRequest();
            }
            else
            {
                DBContext.Roles.Add(rol);
                DBContext.SaveChanges();
                return Ok();

            }

        }

        [HttpPut]
        [Route("/api/Role/{id}")]
        public async Task<IActionResult> PutSolicitud(int id, Role rol)
        {
            if (id != rol.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(rol).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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


        private bool RoleExists(int id)
        {
            return (DBContext.Roles?.Any(e => e.Id == id)).GetValueOrDefault();
        }


    



}
}
