using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CourseProject.DAL.Abstract
{
    public interface IRoleManager<TRole> where TRole : class
    {
        Task<bool> CreateRoleAsync(TRole role);
        Task<bool> UpdateRoleAsync(TRole role);
        Task<bool> RemoveRoleAsync(TRole role);
        Task<TRole> FindByRoleIdAsync(Guid? roleId);
        IQueryable<TRole> GetRolesAsync(Expression<Func<TRole, bool>> predicate = null);
        Task<TRole> SingleOrDefaultAsync(Expression<Func<TRole, bool>> predicate = null);
    }
}