namespace CourseProject.DAL.Abstract
{
    public interface ICryptography
    {
        string HashPassword(string password);
        bool VerifyHashedPassword(string savedPasswordHash, string password);
    }
}