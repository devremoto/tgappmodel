using System;

namespace Domain.Entities
{
    public class Language
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool Active { get; set; }
        public bool Default { get; set; }
		public bool Loaded { get; set; }
	}
}
