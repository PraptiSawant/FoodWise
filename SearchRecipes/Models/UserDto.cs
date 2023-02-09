using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SearchRecipes.Models
{
    public class UserDto
    {
        [Key]
        public int UserId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string UserName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string EmailId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Password { get; set; }
    }
}
