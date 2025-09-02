namespace Inventory.Backend.Dtos
{
    public class StockMovementCreateDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string MovementType { get; set; } = string.Empty; // e.g. "IN" or "OUT"
        public DateTime MovementDate { get; set; } = DateTime.UtcNow;
    }
}
