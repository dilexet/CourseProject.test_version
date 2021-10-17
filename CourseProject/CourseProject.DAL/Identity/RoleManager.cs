using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CourseProject.DAL.Abstract;

namespace CourseProject.DAL.Identity
{
    public class RoleManager<TRole> : IRoleManager<TRole> where TRole : class
    {
        private readonly IRepository _repository;

        public RoleManager(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> CreateRoleAsync(TRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            var result = await _repository.CreateAsync(role);
            if (result)
            {
                return await _repository.SaveAsync();
            }

            return false;
        }

        public async Task<bool> UpdateRoleAsync(TRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            var result = await _repository.UpdateAsync(role);
            if (result)
            {
                return await _repository.SaveAsync();
            }

            return false;
        }

        public async Task<bool> RemoveRoleAsync(TRole role)
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            var result = await _repository.RemoveAsync(role);
            if (result)
            {
                return await _repository.SaveAsync();
            }

            return false;
        }

        public async Task<TRole> FindByRoleIdAsync(Guid? roleId)
        {
            if (roleId == null)
            {
                throw new ArgumentNullException(nameof(roleId));
            }

            var role = await _repository.FindByIdAsync<TRole>(roleId);
            return role;
        }

        public IQueryable<TRole> GetRolesAsync(Expression<Func<TRole, bool>> predicate = null)
        {
            var roles = _repository.GetAsync(predicate);
            return roles;
        }


        public async Task<TRole> SingleOrDefaultAsync(Expression<Func<TRole, bool>> predicate = null)
        {
            var role = await _repository.SingleOrDefaultAsync(predicate);
            return role;
        }
    }
}