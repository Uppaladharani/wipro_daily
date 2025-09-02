namespace Inventory.Backend.Models
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "staff";
        public bool Active { get; set; } = true;
    }
}
