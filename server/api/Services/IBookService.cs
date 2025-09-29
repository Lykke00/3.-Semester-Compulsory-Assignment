using api.Dto;
using api.Dto.Requests;

namespace api.Services;

public interface IBookService
{
    Task<List<BookDto>> All();
    Task<BookDto> Create(CreateBookRequest book);
    Task<BookDto> Get(string id);
    Task<BookDto> Update(BookDto book);
    Task<bool> Delete(string id);
    Task<BookDto> AddGenre(string bookId, string genreId);
    Task<BookDto> RemoveGenre(string bookId, string genreId);
}