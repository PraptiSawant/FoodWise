using SearchRecipes.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;

namespace SearchRecipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RecipeDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(RecipeDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public static User user = new User();
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.UserName = request.UserName;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.EmailId = request.EmailId;
            if (_context.Users == null)
            {
                return Problem("Entity set 'RecipeDbContext.Users'  is null.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
        private static List<User> UserList = new List<User>();
        public static Usercred usercred = new Usercred();
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var Query = (from ing in _context.Users where ing.EmailId.Equals(request.EmailId) select new { ing.EmailId, ing.UserName, ing.PasswordHash, ing.PasswordSalt, ing.UserId }).ToArray();
            foreach (var x in Query)
            {
                var match = VerifyPasswordHash(request.Password, x.PasswordHash, x.PasswordSalt);
                if (!match)
                {
                    return BadRequest("wrong Password");
                }
                user.UserName = x.UserName;
                user.EmailId = x.EmailId;
                user.UserId = x.UserId;
            }
            string token = CreateToken(user);
            usercred.token = token;
            usercred.userName = user.UserName;
            usercred.userEmailId = user.EmailId;
            usercred.userId = user.UserId;
            return Ok(usercred);
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>();
            {
                new Claim(ClaimTypes.Name, ClaimTypes.Email, user.UserName, user.EmailId);
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }

        }
       
    }
}
