using System.ComponentModel.DataAnnotations;

namespace api.Dto.Requests;

public class CreateGenreRequest
{
    [Required(ErrorMessage = "Name is required")]
    [Length(2, 75)]
    public required string Name { get; set; }

}