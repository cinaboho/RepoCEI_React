using sistema_gestion_solicitudes;
using System.Net;
using System.Net.Mail;

public class EmailSender : IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string message)
    {
        var client = new SmtpClient("smtp.office365.com", 587)
        {
            EnableSsl = true,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential("cei_prueba@outlook.com", "Ceitest123*")
        };

        return client.SendMailAsync(
            new MailMessage(from: "cei_prueba@outlook.com",
                            to: email,
                            subject,
                            message
                            ));

    }


}