using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;

namespace sistema_gestion_solicitudes.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : Controller
    {
        private readonly GestionContext DBContext;

        public PermissionController(GestionContext DBContext)
        {
            this.DBContext = DBContext;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Permission>>> GetPermissions()
        {
            return await DBContext.Permissions.ToListAsync();
        }

    }
}
