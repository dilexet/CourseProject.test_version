using System;

namespace CourseProject.DAL.Models
{
    public class Role
    {
        private Role()
        {
        }

        public Role(string name)
        {
            Id = Id.Equals(Guid.Empty) ? Guid.NewGuid() : Id;
            Name = name;
            NormalizedName = name.ToLower();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
    }
}