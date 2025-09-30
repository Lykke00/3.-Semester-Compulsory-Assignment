using api.Dto;
using api.Dto.Requests;
using dataaccess.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class BookService(MyDbContext context) : IBookService
{
    public Task<List<BookDto>> All()
    {
        return context.Books
            .Include(b => b.Genre)
            .Include(a => a.Authors)
            .Select(book => new BookDto(book))
            .ToListAsync();
        
    }
    
    public async Task<BookDto> Get(Guid id)
    {
        var book = await context.Books
            .Include(b => b.Genre)
            .Where(b => b.Id == id)
            .FirstAsync();
        
        if (book == null)
            throw new KeyNotFoundException("book not found");
        
        return new BookDto(book);
    }

    public async Task<BookDto> Create(CreateBookRequest book)
    {
        var createdBook = new Book
        {
            Title = book.Title,
            Pages = book.Pages,
            Createdat = DateTime.UtcNow
        };
        
        await context.Books.AddAsync(createdBook);
        await context.SaveChangesAsync();
        
        return new BookDto(createdBook);
    }

    public async Task<BookDto> Update(EditBookRequest book)
    {
        var updatedBook = await context.Books.FindAsync(book.Id);
        if (updatedBook == null)
            throw new KeyNotFoundException("Book not found");
        
        updatedBook.Title = book.Title;
        updatedBook.Pages = book.Pages;
        updatedBook.Genreid = book.GenreId;
        
        await context.SaveChangesAsync();
        
        return await Get(book.Id);
    }

    public async Task<bool> Delete(Guid id)
    {
        var book = await context.Books.FindAsync(id);
        if (book == null)
            throw new KeyNotFoundException("Book not found");
        
        context.Books.Remove(book);
        await context.SaveChangesAsync();

        return true;
    }
    
    public async Task<BookDto> AddGenre(string bookId, string genreId)
    {
        var book = await context.Books.FindAsync(bookId);
        if (book == null)
            throw new KeyNotFoundException("Book not found");
        
        var genre = await context.Genres.FindAsync(genreId);
        if (genre == null)
            throw new KeyNotFoundException("Genre not found");
        
        book.Genre = genre;
        await context.SaveChangesAsync();
        
        return new BookDto(book);
    }

    public async Task<BookDto> RemoveGenre(string bookId, string genreId)
    {
        var book = await context.Books.FindAsync(bookId);
        if (book == null)
            throw new KeyNotFoundException("Book not found");
        
        var genre = await context.Genres.FindAsync(genreId);
        if (genre == null)
            throw new KeyNotFoundException("Genre not found");
        
        book.Genre = null;
        await context.SaveChangesAsync();
        return new BookDto(book);
    }

    public async Task<BookDto> UpdateAuthors(Guid bookId, List<Guid> authorsToDelete, List<Guid> authorsToAdd)
    {
        var book = await context.Books
            .Include(b => b.Authors) // load the existing authors
            .FirstOrDefaultAsync(b => b.Id == bookId);

        if (book == null)
            throw new KeyNotFoundException("Book not found");

        if (authorsToDelete != null && authorsToDelete.Any())
        {
            var authorsToRemove = book.Authors.Where(a => authorsToDelete.Contains(a.Id)).ToList();
            foreach (var author in authorsToRemove)
            {
                book.Authors.Remove(author);
            }
        }

        if (authorsToAdd != null && authorsToAdd.Any())
        {
            var existingAuthorIds = book.Authors.Select(a => a.Id).ToHashSet();
            var authorsToAddEntities = await context.Authors
                .Where(a => authorsToAdd.Contains(a.Id) && !existingAuthorIds.Contains(a.Id))
                .ToListAsync();

            foreach (var author in authorsToAddEntities)
            {
                book.Authors.Add(author);
            }
        }

        await context.SaveChangesAsync();

        return new BookDto(book);
    }

}