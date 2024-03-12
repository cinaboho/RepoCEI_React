using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;
using sistema_gestion_solicitude;
using sistema_gestion_solicitudes;
using sistema_gestion_solicitudes.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options => options.AddPolicy("TheCodeBuzzPolicy", builder =>
{
    builder.WithOrigins("https://localhost:44448/")
           .AllowAnyMethod()
           .AllowAnyHeader();
}));




builder.Services.AddEntityFrameworkMySQL().AddDbContext<GestionContext>(options =>
{
        options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services.AddHostedService<TareaAutomatica>();


builder.Services.AddCors(options =>
{

    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IEmailSender, EmailSender>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseCors();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

