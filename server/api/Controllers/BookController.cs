using api.Dto;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController(IBookService service) : ControllerBase
{
    [HttpGet]
    [Route("/authors")]
    public async Task<List<BookDto>> All()
    {
        return await service.All();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<BookDto> Get(string id)
    {
        return await service.Get(id);
    }

    [HttpPost]
    public async Task<BookDto> Create(BookDto author)
    {
        return await service.Create(author);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<BookDto> Update(BookDto author)
    {
        return await service.Update(author);
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(string id)
    {
        return await service.Delete(id);
    }

    [HttpPost]
    [Route("addGenre")]
    public async Task<BookDto> AddGenre(string id, string genreId)
    {
        return await service.AddGenre(id, genreId);
    }

    [HttpPost]
    [Route("removeGenre")]
    public async Task<BookDto> RemoveGenre(string id, string genreId)
    {
        return await service.RemoveGenre(id, genreId);
    }
}