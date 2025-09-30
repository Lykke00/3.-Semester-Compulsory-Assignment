using api.Dto;
using api.Dto.Requests;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GenreController(IGenreService service) : ControllerBase
{
    [HttpGet]
    [Route("/genres")]
    public async Task<List<GenreDto>> All()
    {
        return await service.All();
    }
    
    [HttpGet]
    [Route("{id}")]
    public async Task<GenreDto> Get(string id)
    {
        return await service.Get(id);
    }

    [HttpPost]
    public async Task<GenreDto> Create(CreateGenreRequest genre)
    {
        return await service.Create(genre);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<GenreDto> Update(GenreDto genre)
    {
        return await service.Update(genre);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(string id)
    {
        return await service.Delete(id);
    }
}