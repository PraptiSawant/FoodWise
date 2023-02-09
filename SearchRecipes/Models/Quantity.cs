using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SearchRecipes.Models
{
    public class Quantity
    {
        [Key]
        public int QtyId { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
        public int IngredientId { get; set; }
        public Ingredient Ingredients { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string QuantityR { get; set; }
    }
}
