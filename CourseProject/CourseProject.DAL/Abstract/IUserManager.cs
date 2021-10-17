using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CourseProject.DAL.Abstract
{
    public interface IUserManager<TUser> where TUser : class
    {
        Task<bool> CreateUserAsync(TUser user);
        Task<bool> UpdateUserAsync(TUser user);
        Task<bool> RemoveUserAsync(TUser user);

        Task<TUser> FindByUserIdAsync(Guid? userId);
        IQueryable<TUser> GetUsersAsync(Expression<Func<TUser, bool>> predicate = null);
        Task<TUser> SingleOrDefaultAsync(Expression<Func<TUser, bool>> predicate = null);
        Task<bool> CheckPassword(string hashPassword, string password);
        Task<string> HasPasswordAsync(string password);
    }
}