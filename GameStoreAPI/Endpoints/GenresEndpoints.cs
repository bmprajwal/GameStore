using GameStoreAPI.Data;
using GameStoreAPI.Mapping;
using Microsoft.EntityFrameworkCore;

namespace GameStoreAPI.Endpoints;

public static class GenresEndpoints
{
  public static RouteGroupBuilder MapGenresEndpoints(this WebApplication app){
    var group = app.MapGroup("genres");

    group.MapGet("/", async (GameStoreContext dbContext) => (
      await dbContext.Genres.Select(genre => genre.toDto()).AsNoTracking().ToListAsync()
    ));

    return group;
  }
}
