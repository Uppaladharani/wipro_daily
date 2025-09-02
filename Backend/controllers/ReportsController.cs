using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Inventory.Backend.Data;
using Inventory.Backend.Dtos;

namespace Inventory.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ReportsController(AppDbContext db) { _db = db; }

        [HttpGet("inventory-summary")]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> InventorySummary()
        {
            var totalItems = await _db.Products.CountAsync();
            var totalStock = await _db.Products.SumAsync(p => p.StockQuantity);
            var lowStock = await _db.Products.Where(p => p.StockQuantity <= p.ReorderLevel).ToListAsync();
            return Ok(new { totalItems, totalStock, lowStock });
        }

        [HttpPost("movements")]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> Movements([FromBody] MovementFilterDto filter)
        {
            var q = _db.StockMovements.AsQueryable();
            if (filter.From.HasValue) q = q.Where(m => m.Timestamp >= filter.From.Value);
            if (filter.To.HasValue) q = q.Where(m => m.Timestamp <= filter.To.Value);
            if (filter.ProductId.HasValue) q = q.Where(m => m.ProductId == filter.ProductId.Value);

            var list = await q.OrderByDescending(m => m.Timestamp).ToListAsync();
            return Ok(list);
        }
    }
}
