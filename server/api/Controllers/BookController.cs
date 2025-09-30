using api.Dto;
using api.Dto.Requests;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController(IBookService service) : ControllerBase
{
    [HttpGet]
    [Route("/books")]
    public async Task<List<BookDto>> All()
    {
        return await service.All();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<BookDto> Get(Guid id)
    {
        return await service.Get(id);
    }

    [HttpPost]
    public async Task<BookDto> Create(CreateBookRequest book)
    {
        return await service.Create(book);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<BookDto> Update(EditBookRequest book)
    {
        return await service.Update(book);
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<bool> Delete(Guid id)
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
    
    [HttpPost]
    [Route("addAuthor")]
    public async Task<BookDto> AddAuthor(Guid id, Guid authorId)
    {
        return await service.AddAuthor(id, authorId);
    }

    [HttpPost]
    [Route("removeAuthor")]
    public async Task<BookDto> RemoveAuthor(Guid id, Guid authorId)
    {
        return await service.RemoveAuthor(id, authorId);
    }
}