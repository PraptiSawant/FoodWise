using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SearchRecipes.Models
{
    public class Recipe
    {
        [Key]
        public int RecipeId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string RecipeName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string RecipeSubtitle { get; set; }
        [Column(TypeName = "nvarchar(100)")]

        public string RecipeImgUrl{ get; set; }
        [Column(TypeName = "nvarchar(1000)")]

        public string RecipeUrl { get; set; }
    }
}
