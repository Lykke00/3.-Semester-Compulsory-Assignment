using api;
using api.Dto.Requests;
using api.Services;
using dataaccess.Models;
using Microsoft.EntityFrameworkCore;

namespace tests;

public class AuthorTests(IAuthorService authorService, MyDbContext ctx, ISeeder seeder)
{
    [Fact]
    public async Task UpdateAuthor_CanUpdateAuthorPropertiesAndAddNewBookRelations()
    {
        await seeder.Seed();

        var updateRequest = new EditAuthorRequest
        {
            Id = Seeder.AuthorOne,
            Name = "new Name"
        };
        var result = await authorService.Update(updateRequest);
        Assert.True(result.Name == updateRequest.Name);
    }
}