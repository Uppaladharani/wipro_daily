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
    public class StockMovementsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public StockMovementsController(AppDbContext db) { _db = db; }

        [HttpGet]
        [Authorize(Roles = "admin,manager,staff")]
        public async Task<IActionResult> GetAll() => Ok(await _db.StockMovements.OrderByDescending(m => m.Timestamp).ToListAsync());

        [HttpPost]
        [Authorize(Roles = "admin,manager,staff")]
        public async Task<IActionResult> Record([FromBody] StockMovementCreateDto dto)
        {
            var product = await _db.Products.FindAsync(dto.ProductId);
            if (product is null) return NotFound($"Product {dto.ProductId} not found");

            if (dto.Type == MovementType.Out && product.StockQuantity < dto.Quantity)
                return BadRequest("Insufficient stock");

            var movement = new StockMovement
            {
                ProductId = dto.ProductId,
                Type = dto.Type,
                Quantity = dto.Quantity,
                Note = dto.Note,
                Timestamp = System.DateTime.UtcNow
            };

            _db.StockMovements.Add(movement);
            product.StockQuantity += (dto.Type == MovementType.In ? dto.Quantity : -dto.Quantity);

            await _db.SaveChangesAsync();
            return Ok(movement);
        }
    }
}
