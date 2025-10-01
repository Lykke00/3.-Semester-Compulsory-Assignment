using System.ComponentModel.DataAnnotations;

namespace api.Dto.Requests;

public class CreateBookRequest
{
    [Required(ErrorMessage = "Title is required")]
    [Length(2, 160)]
    public required string Title { get; set; }
    
    [Required(ErrorMessage = "Pages is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Pages must be a positive number")]
    public int Pages { get; set; }
    public Guid? GenreId { get; set; } 
    
    public List<Guid>? AuthorIds { get; set; } = new();
}