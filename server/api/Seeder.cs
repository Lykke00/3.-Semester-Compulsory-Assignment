using dataaccess.Models;

namespace api;

public class Seeder(MyDbContext ctx) : ISeeder
{
    public static Guid AuthorOne = Guid.NewGuid();
    public static Guid AuthorTwo = Guid.NewGuid();
    public static Guid AuthorThree = Guid.NewGuid();

    public async Task Seed()
    {
        ctx.Books.RemoveRange(ctx.Books);
        ctx.Authors.RemoveRange(ctx.Authors);
        ctx.Genres.RemoveRange(ctx.Genres);
        ctx.SaveChanges();

        var author = new Author
        {
            Createdat = DateTime.UtcNow,
            Id = AuthorOne,
            Name = "Bob"
        };
        ctx.Authors.Add(author);
        ctx.SaveChanges();
        var book = new Book
        {
            Createdat = DateTime.UtcNow,
            Id = AuthorTwo,
            Pages = 42,
            Title = "Bobs book"
        };
        ctx.Books.Add(book);
        ctx.SaveChanges();
        var genre = new Genre
        {
            Createdat = DateTime.UtcNow,
            Id = AuthorThree,
            Name = "thriller"
        };
        ctx.Genres.Add(genre);
        ctx.SaveChanges();
    }
}

public interface ISeeder
{
    public Task Seed();
}