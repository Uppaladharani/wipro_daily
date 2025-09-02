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
    public class SettingsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public SettingsController(AppDbContext db) { _db = db; }

        [HttpGet]
        [Authorize(Roles = "admin,manager")]
        public async Task<IActionResult> Get()
        {
            var s = await _db.Settings.FirstOrDefaultAsync(s => s.Id == 1) ?? new AppSettings { Id = 1 };
            return Ok(s);
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Update([FromBody] SettingsUpdateDto dto)
        {
            var s = await _db.Settings.FirstOrDefaultAsync(s => s.Id == 1);
            if (s is null)
            {
                s = new AppSettings { Id = 1 };
                _db.Settings.Add(s);
            }
            s.CompanyName = dto.CompanyName;
            s.DefaultCurrency = dto.DefaultCurrency;
            s.Theme = dto.Theme;
            s.EmailNotifications = dto.EmailNotifications;
            s.SmsNotifications = dto.SmsNotifications;
            await _db.SaveChangesAsync();
            return Ok(s);
        }
    }
}
