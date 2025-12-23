using backend.Data;
using backend.Interfaces;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using static backend.Data.AppDbContext;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("DeskBookingDb"));

builder.Services.AddScoped<IDeskRepository, DeskRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IDeskService, DeskService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddSingleton<ICurrentUser, CurrentUser>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCors", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    SeedData(context);
}

app.UseRouting();

app.UseCors("FrontendCors");

app.MapControllers();

app.MapControllers();
app.Run();
