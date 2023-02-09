using SearchRecipes.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.ComponentModel;
using System.Net.NetworkInformation;
using Newtonsoft.Json.Linq;

namespace SearchRecipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuantitiesController : Controller
    {
        // GET: QuantitiesController
        private readonly RecipeDbContext _context;
        public QuantitiesController(RecipeDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet("{inglist}")]
        public async Task<ActionResult<IEnumerable<Quantity>>> GetQuantities(string inglist)
        {
            //var values = inglist.Split(',');
            /*for (int i = 0; i < values.Length; i++)
            {
                values[i] = values[i].Trim();
            }*/
            var Query = (from ing in _context.Ingredients where (inglist.Contains(ing.IngredientName)) select ing.IngredientId).ToList();
            var Qs = (from qty in _context.Quantities join rec in _context.Recipes on qty.RecipeId equals rec.RecipeId where (Query.Contains(qty.IngredientId)) select new { qty.RecipeId ,rec.RecipeName,rec.RecipeSubtitle,rec.RecipeImgUrl,rec.RecipeUrl}).ToList();
            var g = Qs.GroupBy(i => i).OrderByDescending(s => s.Count()).ToArray();
            var usedIng= (from ing in _context.Ingredients join qty in _context.Quantities on ing.IngredientId equals qty.IngredientId where (inglist.Contains(ing.IngredientName)) select new { ing.IngredientId, ing.IngredientName, qty.RecipeId }).ToList().GroupBy(i=>i.RecipeId).OrderByDescending(s => s.Count()).ToArray();
            if (g.Length==0)
            {
                return BadRequest();
            }
            else
            return Ok(new { g, usedIng });
           
        }
    }
}
