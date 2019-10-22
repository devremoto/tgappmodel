using System;

namespace Domain.Entities
{
    public class About
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}
