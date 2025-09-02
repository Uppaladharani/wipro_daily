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
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db) { _db = db; }

        [HttpGet]
        [Authorize(Roles = "admin,manager,staff")]
        public async Task<IActionResult> GetAll() => Ok(await _db.Products.ToListAsync());

        [HttpGet("{id:int}")]
        [Authorize(Roles = "admin,manager,staff")]
        public async Task<IActionResult> GetById(int id)
        {
            var p = await _db.Products.FindAsync(id);
            return p is null ? NotFound() : Ok(p);
        }

        [HttpPost]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> Create([FromBody] ProductCreateDto dto)
        {
            var p = new Product{ Name=dto.Name, Sku=dto.Sku, UnitPrice=dto.UnitPrice, StockQuantity=dto.StockQuantity, ReorderLevel=dto.ReorderLevel, Active=dto.Active };
            _db.Products.Add(p);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductUpdateDto dto)
        {
            var p = await _db.Products.FindAsync(id);
            if (p is null) return NotFound();
            p.Name=dto.Name; p.Sku=dto.Sku; p.UnitPrice=dto.UnitPrice; p.StockQuantity=dto.StockQuantity; p.ReorderLevel=dto.ReorderLevel; p.Active=dto.Active;
            await _db.SaveChangesAsync();
            return Ok(p);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var p = await _db.Products.FindAsync(id);
            if (p is null) return NotFound();
            _db.Products.Remove(p);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
