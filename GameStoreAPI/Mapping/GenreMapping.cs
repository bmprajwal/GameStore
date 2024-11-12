using GameStoreAPI.Dtos;
using GameStoreAPI.Entities;

namespace GameStoreAPI.Mapping;

public static class GenreMapping
{
  public static GenreDto toDto(this Genre genre){
    return new GenreDto(genre.Id, genre.Name);
  }
}
