using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CourseProject.DAL.Abstract;

// ReSharper disable TemplateIsNotCompileTimeConstantProblem

namespace CourseProject.DAL.Identity
{
    public class UserManager<TUser> : IUserManager<TUser> where TUser : class
    {
        private readonly IRepository _repository;
        private readonly ICryptography _cryptography;


        public UserManager(IRepository repository, ICryptography cryptography)
        {
            _repository = repository;
            _cryptography = cryptography;
        }

        public async Task<bool> CreateUserAsync(TUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var result = await _repository.CreateAsync(user);
            if (result)
            {
                return await _repository.SaveAsync();
            }

            return false;
        }

        public async Task<bool> UpdateUserAsync(TUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var result = await _repository.UpdateAsync(user);
            if (result)
            {
                return await _repository.SaveAsync();
            }

            return false;
        }

        public async Task<bool> RemoveUserAsync(TUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var result = await _repository.RemoveAsync(user);
            if (result)
            {
                return await _repository.SaveAsync();
            }

            return false;
        }

        public async Task<TUser> FindByUserIdAsync(Guid? userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var user = await _repository.FindByIdAsync<TUser>(userId);
            return user;
        }

        public async Task<TUser> SingleOrDefaultAsync(Expression<Func<TUser, bool>> predicate = null)
        {
            var user = await _repository.SingleOrDefaultAsync(predicate);
            return user;
        }

        public IQueryable<TUser> GetUsersAsync(Expression<Func<TUser, bool>> predicate = null)
        {
            var users = _repository.GetAsync(predicate);
            return users;
        }

        public async Task<bool> CheckPassword(string hashPassword, string password)
        {
            if (string.IsNullOrEmpty(hashPassword))
            {
                throw new ArgumentNullException(nameof(hashPassword));
            }

            if (string.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException(nameof(password));
            }

            var result = await Task.Factory.StartNew(() => _cryptography.VerifyHashedPassword(hashPassword, password));
            return result;
        }

        public async Task<string> HasPasswordAsync(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException(nameof(password));
            }

            var hashPassword = await Task.Factory.StartNew(() => _cryptography.HashPassword(password));
            return hashPassword;
        }
    }
}