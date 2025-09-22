using dataaccess.Models;

namespace api.Dto;

public class BookDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public int Pages { get; set; }
    public DateTime CreatedAt { get; set; }
    public GenreDto? Genre { get; set; }

    public BookDto(Book book)
    {
        Id = book.Id;
        Title = book.Title;
        Pages = book.Pages;
        CreatedAt = book.Createdat ?? DateTime.Now;
        
        if (book.Genre != null)
            Genre = new GenreDto(book.Genre);
    }
}