using api.Dto;
using api.Dto.Requests;
using dataaccess.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class AuthorService(MyDbContext context) : IAuthorService
{
    public Task<List<AuthorDto>> All()
    {
        return context.Authors
            .Include(b => b.Books)
            .Select(author => new AuthorDto(author))
            .ToListAsync();
    }

    public async Task<AuthorDto> Get(Guid id)
    {
        var author = await context.Authors.FindAsync(id);
        if (author == null)
            throw new KeyNotFoundException("Author not found");
        
        return new AuthorDto(author);
    }

    public async Task<AuthorDto> Create(CreateAuthorRequest author)
    {
        var createdAuthor = new Author
        {
            Name = author.Name,
            Createdat = DateTime.UtcNow
        };
        
        await context.Authors.AddAsync(createdAuthor);
        await context.SaveChangesAsync();
        
        return new AuthorDto(createdAuthor);
    }

    public async Task<AuthorDto> Update(EditAuthorRequest author)
    {
        var updatedAuthor = await context.Authors.FindAsync(author.Id);
        if (updatedAuthor == null)
            throw new KeyNotFoundException("Author not found");
        
        updatedAuthor.Name = author.Name;
        await context.SaveChangesAsync();
        
        return new AuthorDto(updatedAuthor);
    }

    public async Task<bool> Delete(Guid id)
    {
        var author = await context.Authors.FindAsync(id);
        if (author == null)
            throw new KeyNotFoundException("Author not found");
        
        context.Authors.Remove(author);
        await context.SaveChangesAsync();
        return true;
    }
}