using System.ComponentModel.DataAnnotations;
using dataaccess.Models;

namespace api.Dto;

public class AuthorDto
{
    public Guid Id { get; set; }
    
    [Required(ErrorMessage = "Name is required")]
    [Length(2, 75)]
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public List<BookSimpleDto> Books { get; set; }

    public AuthorDto(Author author)
    {
        Id = author.Id;
        Name = author.Name;
        CreatedAt = author.Createdat ?? DateTime.Now;
        Books = author.Books.Select(b => new BookSimpleDto(b)).ToList();
    }
}