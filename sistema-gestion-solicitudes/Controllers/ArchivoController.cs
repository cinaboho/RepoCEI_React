using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema_gestion_solicitudes.Models;
using static sistema_gestion_solicitudes.Controllers.ArchivoController;


namespace sistema_gestion_solicitudes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArchivoController : ControllerBase
    {
        private readonly GestionContext DBContext;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ILogger<ArchivoController> logger;


        public ArchivoController(IWebHostEnvironment hostingEnvironment, GestionContext context, ILogger<ArchivoController> logger)
        {
            DBContext = context;
            _hostingEnvironment = hostingEnvironment;
            this.logger = logger;
        }

        // GET: api/Archivo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Archivo>>> GetArchivo()
        {
          if (DBContext.Archivo == null)
          {
              return NotFound();
          }
            return await DBContext.Archivo.ToListAsync();
        }

        // GET: api/Archivo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Archivo>> GetArchivo(int id)
        {
          if (DBContext.Archivo == null)
          {
              return NotFound();
          }
            var archivo = await DBContext.Archivo.FindAsync(id);

            if (archivo == null)
            {
                return NotFound();
            }

            return archivo;
        }


        [HttpGet]
        [Route("/api/ArchivosBySolicitud/{id}")]
        public async Task<ActionResult<IEnumerable<Archivo>>> GetArchivosBySolicitud(int id)
        {
            if (DBContext.Archivo == null)
            {
                return NotFound();
            }
            var archivos = await DBContext.Archivo.Where(s => s.SolicitudDetalleId == id)
                .Include(s => s.TipoArchivo)
                .Include(s => s.Usuario)
                .ToListAsync();

            return archivos;
        }


        [HttpGet]
        [Route("/api/ArchivosByType/")]
        public async Task<ActionResult<IEnumerable<Archivo>>> FilterDocumentByType(int id, string tipo)
        {
            if (DBContext.Archivo == null)
            {
                return NotFound();
            }
            var archivos = await DBContext.Archivo.Where(s => s.SolicitudDetalleId == id && s.TipoArchivo.Nombre == tipo)
                .Include(s => s.TipoArchivo)
                .Include(s => s.Usuario)
                .ToListAsync();

            return archivos;
        }





        // PUT: api/Archivo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArchivo(int id, Archivo archivo)
        {
            if (id != archivo.Id)
            {
                return BadRequest();
            }

            DBContext.Entry(archivo).State = EntityState.Modified;

            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArchivoExists(id))
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

        // POST: api/Archivo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Archivo>> PostArchivo(Archivo archivo)
        {
          if (DBContext.Archivo == null)
          {
              return Problem("Entity set 'GestionContext.Archivo'  is null.");
          }
            var newFile  = new Archivo
            {
                Nombre = archivo.Nombre,
                SolicitudDetalleId = archivo.SolicitudDetalleId,
                URL = archivo.URL,
                FechaCreacion = DateTime.Now,
                NumeroDescargas = 0,
                Extension = archivo.Extension,
                UsuarioId = archivo.UsuarioId,
                TipoArchivoId = archivo.TipoArchivoId
            };
            DBContext.Archivo.Add(newFile);
            await DBContext.SaveChangesAsync();

            return StatusCode(200,  newFile);
        }


        public class ArchivoDto
        {
            public List<IFormFile> Files { get; set; } // Asegúrate de que el nombre de la propiedad coincida con la clave usada en el cliente
            public List<string> Nombre { get; set; }
            public List<int> SolicitudDetalleId { get; set; }
            public List<string> Extension { get; set; }
            public List<int> UsuarioId { get; set; }
            public List<int> TipoArchivoId { get; set; }


        }

        [HttpPost]
        [Route("/api/Archivos/Create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateArchivo([FromForm] ArchivoDto archivoDto)
        {
            if (DBContext.Archivo == null)
            {
                this.logger.LogError("DBContext.Archivo is null.");
                return BadRequest("DBContext.Archivo is null.");
            }

            this.logger.LogInformation("PASO #1: DBContext.Archivo no es null");

            try
            {
                this.logger.LogWarning("files.Count: "+ archivoDto.Files.Count.ToString());

                for (int i = 0; i < archivoDto.Files.Count; i+=1)
                {
                    var file = archivoDto.Files[i];
                    var nombre = archivoDto.Nombre[i];
                    var SolicitudDetalleId = archivoDto.SolicitudDetalleId[i];
                    var Extension = archivoDto.Extension[i];
                    var UsuarioId = archivoDto.UsuarioId[i];
                    var TipoArchivoId = archivoDto.TipoArchivoId[i];

                    try
                    {
                        
                        this.logger.LogWarning("files.Count: " + file);

                        var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                        // Loguea el directorio base para verificarlo
                        this.logger.LogWarning($"baseDirectory: {baseDirectory}");

                        // Sube cuatro niveles desde el directorio base
                        var projectDirectory = Path.GetFullPath(Path.Combine(baseDirectory, @"..\..\..\"));

                        // Combina el directorio del proyecto con el path relativo al directorio 'uploads'
                        var relativePath = Path.Combine(projectDirectory, "uploads", file.FileName);

                        // Asegúrate de que la ruta esté bien formada y normalizada
                        var normalizedRelativePath = Path.GetFullPath(new Uri(relativePath).LocalPath);

                        // Loguea la ruta relativa normalizada para verificarla
                        this.logger.LogWarning($"normalizedRelativePath: {normalizedRelativePath}");


                        using (var stream = System.IO.File.Create(normalizedRelativePath))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var newFile = new Archivo
                        {
                            Nombre = nombre,
                            SolicitudDetalleId = SolicitudDetalleId,
                            FechaCreacion = DateTime.Now,
                            NumeroDescargas = 0,
                            Extension = Extension,
                            UsuarioId= UsuarioId,
                            TipoArchivoId= TipoArchivoId,
                            URL= normalizedRelativePath

                        };


                        DBContext.Archivo.Add(newFile);
                        await DBContext.SaveChangesAsync();
                        this.logger.LogInformation($"Archivo procesado: {file.FileName}");

                        this.logger.LogInformation($"Archivo procesado: {file.FileName}");
                    }
                    catch (Exception ex)
                    {
                        this.logger.LogError(ex, $"Error al procesar el archivo: {file.FileName}");
                        // Considera si quieres continuar con el siguiente archivo o no
                    }
                }



                return Ok();

            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("download/{filename}")]
        public IActionResult Download(string filename)
        {
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            // Loguea el directorio base para verificarlo
            this.logger.LogWarning($"baseDirectory: {baseDirectory}");

            // Sube cuatro niveles desde el directorio base
            var projectDirectory = Path.GetFullPath(Path.Combine(baseDirectory, @"..\..\..\"));

            // Combina el directorio del proyecto con el path relativo al directorio 'uploads'
            var relativePath = Path.Combine(projectDirectory, "uploads", filename);

            
            // Verifica si el archivo existe
            if (!System.IO.File.Exists(relativePath))
                return NotFound();

            // Obtén el tipo de contenido para el archivo
            var contentType = "APPLICATION/octet-stream";
            var content = System.IO.File.ReadAllBytes(relativePath);
            return File(content, contentType, Path.GetFileName(relativePath));
        }


        // DELETE: api/Archivo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArchivo(int id)
        {
            if (DBContext.Archivo == null)
            {
                return NotFound();
            }
            var archivo = await DBContext.Archivo.FindAsync(id);
            if (archivo == null)
            {
                return NotFound();
            }

            DBContext.Archivo.Remove(archivo);
            await DBContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ArchivoExists(int id)
        {
            return (DBContext.Archivo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
