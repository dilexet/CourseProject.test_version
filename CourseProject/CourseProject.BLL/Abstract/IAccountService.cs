using System.Threading.Tasks;
using CourseProject.BLL.Models;
using CourseProject.BLL.SharedModels;

namespace CourseProject.BLL.Abstract
{
    public interface IAccountService
    {
        Task<Result> RegisterAsync(RegisterModel registerModel);
        Task<Result> LoginAsync(LoginModel loginModel);
        Task<Result> TokenVerify(string jwt);
    }
}