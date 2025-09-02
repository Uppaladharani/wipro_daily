using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Inventory.Backend.Dtos;

namespace Inventory.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto, [FromServices] IConfiguration cfg)
        {
            // Demo: accept any credentials; in prod validate against DB and hash password.
            var role = string.IsNullOrWhiteSpace(dto.Role) ? "admin" : dto.Role;
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, dto.Email),
                new Claim(ClaimTypes.Role, role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg["Jwt:Key"] ?? "REPLACE_WITH_LONG_SECRET_KEY"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: cfg["Jwt:Issuer"] ?? "Inventory.Backend",
                audience: null,
                claims: claims,
                expires: System.DateTime.UtcNow.AddHours(8),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new LoginResponse(jwt, role));
        }
    }
}
