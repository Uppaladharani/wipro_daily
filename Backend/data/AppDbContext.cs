using Inventory.Backend.Models;   //  So DbSet<> can find your models
using Microsoft.EntityFrameworkCore;

namespace Inventory.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Define tables
        public DbSet<Product> Products { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<AppSettings> Settings { get; set; }
        // Add more DbSets as you add models
    }
}
