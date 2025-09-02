using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventory.Backend.Data;
using Inventory.Backend.Dtos;
using Inventory.Backend.Models;

namespace Inventory.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public UsersController(AppDbContext db) { _db = db; }

        [HttpGet]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> GetAll() => Ok(await _db.Users.ToListAsync());

        [HttpGet("{id:int}")]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> GetById(int id)
        {
            var u = await _db.Users.FindAsync(id);
            return u is null ? NotFound() : Ok(u);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Create([FromBody] UserCreateDto dto)
        {
            var user = new AppUser{ Name=dto.Name, Email=dto.Email, Role=dto.Role, Active=true };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UserUpdateDto dto)
        {
            var u = await _db.Users.FindAsync(id);
            if (u is null) return NotFound();
            u.Name = dto.Name; u.Email = dto.Email; u.Role = dto.Role; u.Active = dto.Active;
            await _db.SaveChangesAsync();
            return Ok(u);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var u = await _db.Users.FindAsync(id);
            if (u is null) return NotFound();
            _db.Users.Remove(u);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
