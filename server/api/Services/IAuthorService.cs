using api.Dto;

namespace api.Services;

public interface IAuthorService
{
    Task<List<AuthorDto>> All();
    
    Task<AuthorDto> Get(string id);
    
    Task<AuthorDto> Create(AuthorDto author);
    
    Task<AuthorDto> Update(AuthorDto author);
    
    Task<bool> Delete(string id);
}