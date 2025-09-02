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
    public class HelpController : ControllerBase
    {
        private readonly AppDbContext _db;
        public HelpController(AppDbContext db) { _db = db; }

        [HttpGet("faqs")]
        [Authorize(Roles = "admin,manager,staff")]
        public async Task<IActionResult> Faqs() => Ok(await _db.Faqs.ToListAsync());

        [HttpPost("contact")]
        [Authorize(Roles = "admin,manager,staff")]
        public IActionResult Contact([FromBody] Inventory.Backend.Dtos.ContactDto dto)
        {
            // In a real app you'd queue an email or ticket. For demo return accepted.
            return Accepted(new { message = "Support request received", at = System.DateTime.UtcNow });
        }
    }
}
