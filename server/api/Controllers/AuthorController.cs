using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorController : ControllerBase
{
    [HttpGet]
    [Route("/authors")]
    public ActionResult<string> All()
    {
        return Ok("hej lykke");
    }
}