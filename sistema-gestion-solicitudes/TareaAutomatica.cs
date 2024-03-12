using System.Threading;
using System.Threading.Tasks;
using System.IO;
using System;



namespace sistema_gestion_solicitude

{
    public class TareaAutomatica : IHostedService, IDisposable
    {
        private Timer _timer;
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(RevisarSolicitudes, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
            return Task.CompletedTask;
            
        }

        public void RevisarSolicitudes(object state)
        {
            
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
