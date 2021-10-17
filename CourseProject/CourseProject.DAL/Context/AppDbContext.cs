using CourseProject.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseProject.DAL.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Role> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role(RoleTypes.Admin.ToString()),
                new Role(RoleTypes.User.ToString()),
                new Role(RoleTypes.Moderator.ToString())
            );
        }
    }
}