using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using api;
using api.Dto.Requests;
using api.Services;
using dataaccess.Models;

namespace tests;

public class BookTests(MyDbContext ctx, IBookService bookService, ISeeder seeder, ITestOutputHelper outputHelper)
{
    [Fact]
    public async Task GetBooks_CanGetAllBookDtos()
    {
        //Existing data is using the "seeder" with 1 book, 1 author and 1 genre without any relations
        await seeder.Seed();

        var actual = await bookService.All();

        Assert.Equal(actual.First().Id, ctx.Books.First().Id);
    }
    
    [Fact]
    public async Task DeleteBook_CanRemoveExistingBook()
    {
        //Existing data is using the "seeder" with 1 book, 1 author and 1 genre without any relations
        await seeder.Seed();
        var actual = await bookService.Delete(ctx.Books.First().Id);
        Assert.True(ctx.Books.Count() == 0);
    }

    [Fact]
    public async Task DeleteBook_ThrowsExceptionIfBookDoesNotExist()
    {
        await Assert.ThrowsAnyAsync<Exception>(async () => await bookService.Delete(Guid.NewGuid()));
    }
}