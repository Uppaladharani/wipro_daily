namespace Inventory.Backend.Models
{
    public class StockMovement
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int Quantity { get; set; }
        public string MovementType { get; set; } = ""; // "IN" or "OUT"
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
