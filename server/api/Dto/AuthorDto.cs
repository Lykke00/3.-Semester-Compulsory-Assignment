using dataaccess.Models;

namespace api.Dto;

public class AuthorDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }

    public AuthorDto(Author author)
    {
        Id = author.Id;
        Name = author.Name;
        CreatedAt = author.Createdat ?? DateTime.Now;
    }
}