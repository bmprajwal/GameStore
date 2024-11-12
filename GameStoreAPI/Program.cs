using GameStoreAPI.Data;
using GameStoreAPI.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowLocalhost", policy =>
  {
    policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod() 
            .AllowAnyHeader(); 
  });
});

var connString = builder.Configuration.GetConnectionString("GameStoreConnection");
builder.Services.AddSqlite<GameStoreContext>(connString);

var app = builder.Build();

app.UseCors("AllowLocalhost");

app.MapGamesEndpoints();
app.MapGenresEndpoints();

await app.MigrateDbAsync();

app.Run();
