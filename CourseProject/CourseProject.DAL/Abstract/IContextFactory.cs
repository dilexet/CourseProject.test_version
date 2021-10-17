using CourseProject.DAL.Context;

namespace CourseProject.DAL.Abstract
{
    public interface IContextFactory
    {
        AppDbContext CreateDbContext(string connectionString);
    }
}