using api.Dto;

namespace api.Services;

public interface IGenreService
{
    Task<List<GenreDto>> All();
    
    Task<GenreDto> Get(string id);
    
    Task<GenreDto> Create(GenreDto genre);
    
    Task<GenreDto> Update(GenreDto genre);
    
    Task<bool> Delete(string id);

}