using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchRecipes.Models;

namespace SearchRecipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishController : Controller
    {
        private readonly RecipeDbContext _context;
        private readonly IConfiguration _configuration;

        public WishController(RecipeDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public static WishList wish = new WishList();
        [HttpPost("fav")]

        public async Task<ActionResult<WishList>> Fav(WishList request)
        {
            wish.RecipeId= request.RecipeId;
            wish.UserId = request.UserId;
            _context.WishLists.Add(wish);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
