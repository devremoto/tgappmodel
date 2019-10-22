using System;

namespace Domain.Entities
{
    public class SocialNetwork
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CssIcon { get; set; }
        public string Url { get; set; }
        public bool Active { get; set; }
    }
}
