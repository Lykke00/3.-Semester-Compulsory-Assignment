using api.Dto;
using dataaccess.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class GenreService(MyDbContext context) : IGenreService
{
    public Task<List<GenreDto>> All()
    {
        return context.Genres.Select(genre => new GenreDto(genre)).ToListAsync();
    }
    
    public async Task<GenreDto> Get(string id)
    {
        var genre = await context.Genres.FindAsync(id);
        if (genre == null)
            throw new KeyNotFoundException("genre not found");
        
        return new GenreDto(genre);
    }

    public async Task<GenreDto> Create(GenreDto genre)
    {
        var createdGenre = new Genre
        {
            Name = genre.Name,
            Createdat = genre.CreatedAt
        };
        
        await context.Genres.AddAsync(createdGenre);
        await context.SaveChangesAsync();
        
        return new GenreDto(createdGenre);
    }

    public async Task<GenreDto> Update(GenreDto genre)
    {
        var updatedGenre = await context.Genres.FindAsync(genre.Id);
        if (updatedGenre == null)
            throw new KeyNotFoundException("genre not found");
        
        updatedGenre.Name = genre.Name;
        await context.SaveChangesAsync();
        
        return new GenreDto(updatedGenre);
    }

    public async Task<bool> Delete(string id)
    {
        var genre = await context.Genres.FindAsync(id);
        if (genre == null)
            throw new KeyNotFoundException("genre not found");
        
        context.Genres.Remove(genre);
        await context.SaveChangesAsync();
        return true;
    }
}