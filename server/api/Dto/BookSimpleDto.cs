using System.ComponentModel.DataAnnotations;
using dataaccess.Models;

namespace api.Dto;

public class BookSimpleDto
{
    public Guid Id { get; set; }
    
    [Required(ErrorMessage = "Title is required")]
    [Length(2, 160)]
    public string Title { get; set; }
    
    [Required(ErrorMessage = "Pages is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Pages must be a positive number")]
    public int Pages { get; set; }
    public GenreDto? Genre { get; set; }

    public BookSimpleDto(Book book)
    {
        Id = book.Id;
        Title = book.Title;
        Pages = book.Pages;
        
        if (book.Genre != null)
            Genre = new GenreDto(book.Genre);
    }
}