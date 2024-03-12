const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:55741';

const context = [
    "/weatherforecast",
    "/api/User",
    "/api/Especialidad",
    "/api/Role",
    "/api/Permission",
    "/api/Solicitud",
    "api/Anexos",
    "api/SolicitudDetalle",
    "api/TipoSolicitud",
    "api/Archivos",
    "api/Asignacion"

];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
