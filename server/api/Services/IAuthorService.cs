using api.Dto;
using api.Dto.Requests;

namespace api.Services;

public interface IAuthorService
{
    Task<List<AuthorDto>> All();
    
    Task<AuthorDto> Get(Guid id);
    
    Task<AuthorDto> Create(CreateAuthorRequest author);
    
    Task<AuthorDto> Update(EditAuthorRequest author);
    
    Task<bool> Delete(Guid id);
}