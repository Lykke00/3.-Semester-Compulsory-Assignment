using api.Dto;
using api.Dto.Requests;

namespace api.Services;

public interface IGenreService
{
    Task<List<GenreDto>> All();
    
    Task<GenreDto> Get(string id);
    
    Task<GenreDto> Create(CreateGenreRequest genre);
    
    Task<GenreDto> Update(Guid id, EditGenreRequest genre);
    
    Task<bool> Delete(Guid id);

}