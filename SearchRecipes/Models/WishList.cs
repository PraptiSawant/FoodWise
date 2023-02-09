using System.ComponentModel.DataAnnotations;

namespace SearchRecipes.Models
{
    public class WishList
    {
        [Key]
        public int WishListId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
