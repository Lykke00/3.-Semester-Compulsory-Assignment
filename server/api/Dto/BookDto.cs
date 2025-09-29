using System.ComponentModel.DataAnnotations;
using dataaccess.Models;
using Microsoft.VisualBasic.CompilerServices;

namespace api.Dto;

public class BookDto
{
    public string Id { get; set; }
    
    [Required(ErrorMessage = "Title is required")]
    [Length(2, 160)]
    public string Title { get; set; }
    
    [Required(ErrorMessage = "Pages is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Pages must be a positive number")]
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