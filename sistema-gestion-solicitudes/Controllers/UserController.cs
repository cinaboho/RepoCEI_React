using Microsoft.AspNetCore.Mvc;
using sistema_gestion_solicitudes.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;
using Microsoft.Extensions.Logging;
using Castle.Core.Smtp;
using Microsoft.Data.SqlClient;


namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly GestionContext DBContext;
        private readonly ILogger<UserController> logger;
        private readonly IEmailSender _emailSender;


        public UserController(GestionContext DBContext, ILogger<UserController> logger, IEmailSender emailSender)
        {
            this.DBContext = DBContext;
            this.logger=logger;
            this._emailSender = emailSender;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<User>>> GetUsuarios()
        {
            var usuarios = await DBContext.Users
                        .Include(e => e.Especialidades)
                        .Include(e=> e.Roles)
                        .ToListAsync();

            return usuarios;
        }


        [HttpGet]
        [Route("/api/RevisoresDisponibles")]

        public async Task<ActionResult<IEnumerable<User>>> GetRevisoresDisponibles()
        {
            var usuarios = await DBContext.Users.Where(s => s.Estado == true && s.Roles.Any(s => s.Nombre =="Miembro del Comite"))
                        .ToListAsync();

            return usuarios;
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (DBContext.Users == null)
            {
                return NotFound();
            }
            var usuario = await DBContext.Users
                            .Include(e => e.Especialidades)
                            .Include(e => e.Roles)
                            .FirstOrDefaultAsync(s => s.Id == id);
;
              

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpGet]
        [Route("/api/getEmailByCode")]
        public async Task<IActionResult> getEmailByCode(string code)
        {
            if (code == null)
            {
                return NotFound();
            }
           
            var invitacionlink = await DBContext.InvitacionLink
                            .FirstOrDefaultAsync(i => i.code == code);
            ;


            if (invitacionlink == null)
            {
                return NotFound();
            }

            if (invitacionlink.correo == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(invitacionlink.correo);
            }

            
        }



        [HttpPost]
        [Route("/api/Register")]
        public async Task<IActionResult> PostUser(User usuario)
        {
            try
            {
                this.logger.LogWarning("is_invited: "+usuario.IsInvited.ToString());

                var comparation = usuario.Correo.Contains("espol.edu.ec");

                this.logger.LogWarning(comparation.ToString());
                if (usuario.Username == null)
                {
                    var username=usuario.Correo.Split('@')[0];
                    usuario.Username = username;
                }

                if (!ModelState.IsValid || await DBContext.Users.AnyAsync(x => x.Correo == usuario.Correo || x.Username == usuario.Username || x.Cedula == usuario.Cedula))
                {
                    return BadRequest("Usuario no válido o ya existe");
                }else if (usuario.Correo.Contains("espol.edu.ec")){
                    return BadRequest("Usuario no puede ser de Espol");
                }
                else
                {
                    this.logger.LogWarning(usuario.ContrasenaHash);
                    if (usuario.ContrasenaHash != null)
                    {
                        usuario.ContrasenaHash = HashPassword(usuario.ContrasenaHash);
                    }

                    // Asegúrate de que los roles existen en la base de datos.
                    var rol1 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Usuario Externo");
                    var rol2 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Investigador");
                    var rol3 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Miembro del Comite");
                    var rol4 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Presidente");
                    var rol5 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Secretaria");


                    if (rol1 != null)
                    {
                        usuario.Roles.Add(rol1);
                    }

                    if (rol2 != null)
                    {
                        usuario.Roles.Add(rol2);
                    }

                    if (usuario.IsInvited == true && rol3 != null)
                    {
                        usuario.Roles.Add(rol3);
                    }

                    

                    usuario.FechaCreacion = DateTime.Now;
                    DBContext.Users.Add(usuario);
                    DBContext.SaveChanges();
                    return Ok();

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

        [HttpPut]
        [Route("/api/User/{id}")]
        public async Task<IActionResult> PutSolicitud(int id, User usuario)
        {
            this.logger.LogError("ID: "+id.ToString());
            this.logger.LogError("usuario: ", usuario.Id);
            if (id != usuario.Id)
            {
                return BadRequest("Usuario no coincide");
            }

            var usuarioExistente = await DBContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (usuarioExistente == null)
            {
                return NotFound();
            }

            usuarioExistente.Nombres = usuario.Nombres;
            usuarioExistente.Apellidos = usuario.Apellidos;
            usuarioExistente.Username = usuario.Username;
            usuarioExistente.Correo = usuario.Correo;
            usuarioExistente.Cedula = usuario.Cedula;
            usuarioExistente.universidad = usuario.universidad;
            usuarioExistente.Estado = usuario.Estado;

            string deleteQuery = "DELETE FROM RoleUser WHERE UserId = "+id.ToString();
            this.logger.LogError("deleteQuery: "+ deleteQuery);
            await DBContext.Database.ExecuteSqlRawAsync(deleteQuery);

            var rol1 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Usuario Externo");
            var rol2 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Investigador");
            var rol3 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Miembro del Comite");
            var rol4 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Presidente");
            var rol5 = await DBContext.Roles.FirstOrDefaultAsync(r => r.Nombre == "Secretario");

            foreach (Role r in usuario.Roles)
            {
                if (rol1 != null && r.Nombre==rol1.Nombre )
                {
                    usuarioExistente.Roles.Add(rol1);
                }

                if (rol2 != null && r.Nombre == rol2.Nombre)
                {
                    usuarioExistente.Roles.Add(rol2);
                }

                if (rol3 != null && r.Nombre == rol3.Nombre)
                {
                    usuarioExistente.Roles.Add(rol3);
                }

                if (rol4 != null && r.Nombre == rol4.Nombre)
                {
                    usuarioExistente.Roles.Add(rol4);
                }

                if (rol5 != null && r.Nombre == rol5.Nombre)
                {
                    usuarioExistente.Roles.Add(rol5);
                }
            }
            //usuarioExistente.Roles = usuario.Roles;
            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Log the detailed error
                this.logger.LogError("An error occurred while updating the database.", ex);
                // Devuelve una respuesta con el error
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.InnerException?.Message ?? ex.Message });
            }
            return Ok();
        }


        private bool UserExists(int id)
        {
            return (DBContext.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public class LoginRequest
        {
            public string Username { get; set; }
            public string Correo { get; set; }
            public string ContrasenaHash { get; set; }
        }

        public class LoginInternoRequest
        {
            public string Correo { get; set; }
        }

        [HttpPost]
        [Route("api/login")]
        public async Task<IActionResult> LoginUser(LoginRequest loginRequest)
        {
            if (loginRequest.Correo != null && loginRequest.ContrasenaHash != null)
            {
                loginRequest.ContrasenaHash = HashPassword(loginRequest.ContrasenaHash);

                // Obtener el usuario y sus roles por correo electrónico
                var user = await DBContext.Users
                                          .Include(u => u.Roles) // Incluir los roles del usuario en la consulta
                                          .FirstOrDefaultAsync(u => u.Correo == loginRequest.Correo &&
                                                                    u.ContrasenaHash == loginRequest.ContrasenaHash);

                // Si el usuario no existe o la contraseña no coincide, devolver un error
                if (user == null)
                {
                    return BadRequest("Credenciales inválidas.");
                }

                // Verificar si el usuario tiene el rol de "usuario externo"
                var hasExternalUserRole = user.Roles.Any(r => r.Nombre == "Usuario Externo");
                if (!hasExternalUserRole)
                {
                    return BadRequest("El usuario no tiene el rol de usuario externo.");
                }

                // El usuario tiene credenciales válidas y es un usuario externo, proceder a devolver la respuesta de éxito
                var result = new
                {
                    Success = true,
                    Message = "Usuario autenticado con éxito como usuario externo.",
                    UserId = user.Id,
                    Correo = user.Correo,
                    Roles = user.Roles
                };

                return Ok(result); // Retornar el objeto como JSON
            }
            else
            {
                return BadRequest("Correo y contraseña son requeridos.");
            }
        }

        [HttpPost]
        [Route("api/loginInterno")]
        public async Task<IActionResult> LoginUserInterno(LoginInternoRequest loginRequest)
        {
            if (loginRequest.Correo != null)
            {
                
                // Obtener el usuario y sus roles por correo electrónico
                var user = await DBContext.Users
                                          .Include(u => u.Roles) // Incluir los roles del usuario en la consulta
                                          .FirstOrDefaultAsync(u => u.Correo == loginRequest.Correo);

                // Si el usuario no existe o la contraseña no coincide, devolver un error
                if (user == null)
                {
                    return BadRequest("Credenciales inválidas.");
                }

                

                // El usuario tiene credenciales válidas y es un usuario externo, proceder a devolver la respuesta de éxito
                var result = new
                {
                    Success = true,
                    Message = "Usuario autenticado con éxito como usuario interno.",
                    UserId = user.Id,
                    Correo = user.Correo,
                    Roles = user.Roles
                };

                return Ok(result); // Retornar el objeto como JSON
            }
            else
            {
                return BadRequest("Correo es requeridos.");
            }
        }




        [HttpPost]
        [Route("/api/NewUsers")]
        public async Task<IActionResult> CreateUser(User usuario)
        {
            if (!ModelState.IsValid || await DBContext.Users.AnyAsync(x => x.Correo == usuario.Correo || x.Username == usuario.Username))
            {
                return BadRequest();
            }
            else
            {
                var user = new User
                {
                    Nombres = usuario.Nombres,
                    Apellidos = usuario.Apellidos,
                    Cedula = usuario.Cedula,
                    Username = usuario.Username,
                    Correo = usuario.Correo,
                    Estado = usuario.Estado,
                    FechaCreacion = DateTime.Now
                };

                foreach (Especialidad esp in usuario.Especialidades)
                {
                    var especialidad = DBContext.Especialidades.FirstOrDefault(e => e.Id == esp.Id);
                   
                    {
                        if (especialidad != null)
                        {
                            
                            user.Especialidades.Add(especialidad);
                            especialidad.Usuarios.Add(user);
                            
                        }
                    }
                }
                foreach (Role rol in usuario.Roles)
                {
                    var role = DBContext.Roles.Find(rol.Id);
                    {
                        if (role != null)
                        {
                            user.Roles.Add(role);
                            role.Usuarios.Add(user);
                        }
                           
                    }
                }
                
                DBContext.Users.Add(user);
                await DBContext.SaveChangesAsync();


                return Ok();

            }

        }

        public static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }


        public class InvitationRequestBody
        {
            public string Email { get; set; }
            public string Mensaje { get; set; }
        }

        [HttpPost]
        [Route("/api/NewInvitation")]
        public async Task<IActionResult> CreateInvitation([FromBody] InvitationRequestBody requestBody)

        {

            Random random = new Random();
            int randomNumber = random.Next(100000, 1000000); // Esto generará un número entre 100000 y 999999
            var string_code = randomNumber.ToString();
            string link = "https://localhost:44448/Registro/" + string_code;

            var nuevaInvitacion = new InvitacionLink
            {
                code = string_code,
                correo = requestBody.Email,
                FechaCreacion = DateTime.UtcNow, // o DateTime.Now dependiendo de tu zona horaria
                Estado = true,
                Link=link
            };

            DBContext.InvitacionLink.Add(nuevaInvitacion);
            await DBContext.SaveChangesAsync();

            string subject = "Invitación por revisión de solicitud";
            string body = requestBody.Mensaje + ". Link de registro: " + link;


            //await _emailSender.SendEmailAsync(requestBody.Email, subject, body);

            //obtengo al usuario presidente
            var presidente = DBContext.Users.FirstOrDefault(u => u.Roles.Any(r => r.Id == 1));
            if(presidente!= null)
            {
                //notifico
                var nuevaNotificacion = new Notificaciones
                {
                    Envia = "system",
                    Mensaje = "Se ha enviado una invitación al " + requestBody.Email +" para que sea usuario externo",
                    FechaCreacion = DateTime.Now, // o DateTime.Now dependiendo de tu zona horaria
                    Notificado = true,
                    Visto = false,
                    RecibeId = presidente.Id
                };

                DBContext.Notificaciones.Add(nuevaNotificacion);
                await DBContext.SaveChangesAsync();
            }
            

            return Ok("Correo enviado");
        }





    }


}

