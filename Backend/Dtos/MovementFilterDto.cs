namespace Inventory.Backend.Dtos
{
    public class MovementFilterDto
    {
        public int? ProductId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
