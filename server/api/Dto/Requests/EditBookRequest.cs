using System.ComponentModel.DataAnnotations;

namespace api.Dto.Requests;

public class EditBookRequest
{
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    [Length(2, 160)]
    public required string Title { get; set; }
    
    [Required(ErrorMessage = "Pages is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Pages must be a positive number")]
    public int Pages { get; set; }
    public int? GenreId { get; set; } 
}