using CourseProject.DAL.Abstract;
using CourseProject.DAL.Context;
using Microsoft.EntityFrameworkCore;

namespace CourseProject.DAL.Factory
{
    public class AppDbContextFactory : IContextFactory
    {
        public AppDbContext CreateDbContext(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}