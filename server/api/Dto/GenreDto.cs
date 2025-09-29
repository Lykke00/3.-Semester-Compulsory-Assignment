using System.ComponentModel.DataAnnotations;
using dataaccess.Models;

namespace api.Dto;

public class GenreDto
{
    public string Id { get; set; }
    
    [Required(ErrorMessage = "Name is required")]
    [Length(2, 75)]
    public string Name { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public GenreDto(Genre genre) 
    {
        Id = genre.Id;
        Name = genre.Name;
        CreatedAt = genre.Createdat ?? DateTime.Now;
    }
}