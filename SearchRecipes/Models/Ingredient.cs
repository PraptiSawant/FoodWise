using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SearchRecipes.Models
{
    public class Ingredient
    {
        [Key]
        public int IngredientId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string IngredientName { get; set; }
    }
}
