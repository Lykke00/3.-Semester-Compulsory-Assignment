using api.Dto;
using api.Dto.Requests;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorController(IAuthorService service) : ControllerBase
{
    [HttpGet]
    [Route("/authors")]
    public async Task<List<AuthorDto>> All()
    {
        return await service.All();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<AuthorDto> Get(Guid id)
    {
        return await service.Get(id);
    }

    [HttpPost]
    public async Task<AuthorDto> Create(CreateAuthorRequest author)
    {
        return await service.Create(author);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<AuthorDto> Update(EditAuthorRequest author)
    {
        return await service.Update(author);
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(Guid id)
    {
        return await service.Delete(id);
    }
}