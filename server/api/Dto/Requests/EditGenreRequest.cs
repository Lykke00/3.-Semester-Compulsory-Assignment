using System.ComponentModel.DataAnnotations;

namespace api.Dto.Requests;

public class EditGenreRequest
{
    [Required(ErrorMessage = "Name is required")]
    [Length(2, 75)]
    public string Name { get; set; }
}