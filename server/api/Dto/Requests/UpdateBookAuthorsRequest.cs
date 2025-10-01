namespace api.Dto.Requests;

public class UpdateBookAuthorsRequest
{
    public Guid BookId { get; set; }
    public List<Guid> Authors { get; set; } = new();
}
