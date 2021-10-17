using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CourseProject.BLL.Abstract;
using CourseProject.BLL.Enums;
using CourseProject.BLL.IdentityServices.Jwt;
using CourseProject.BLL.Models;
using CourseProject.BLL.SharedModels;
using CourseProject.DAL.Abstract;
using CourseProject.DAL.Models;
using Serilog;

// ReSharper disable TemplateIsNotCompileTimeConstantProblem

namespace CourseProject.BLL.IdentityServices
{
    public class AccountService : IAccountService
    {
        private readonly IUserManager<User> _userManager;
        private readonly IRoleManager<Role> _roleManager;
        private readonly JwtService _jwtService;
        private readonly IMapper _mapper;

        public AccountService(IUserManager<User> userManager, IRoleManager<Role> roleManager, JwtService jwtService,
            IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        public async Task<Result> RegisterAsync(RegisterModel registerModel)
        {
            try
            {
                var userExisting = await _userManager.SingleOrDefaultAsync(x =>
                    x.Email.Equals(registerModel.Email) || x.Name.Equals(registerModel.Name));
                if (userExisting != null)
                {
                    return new Result() { Status = StatusType.Error, Message = "User is exists" };
                }
            }
            catch (ArgumentNullException e)
            {
                Log.Error(e.ToString());

                return new Result() { Status = StatusType.Error };
            }

            User user = _mapper.Map<User>(registerModel);
            user.PasswordHash = await _userManager.HasPasswordAsync(registerModel.Password);

            var resultCreating = await CreateRolesIfNotExist();
            if (!resultCreating)
            {
                return new Result() { Status = StatusType.Error };
            }

            if (await _userManager.SingleOrDefaultAsync() == null)
            {
                user.Role = await _roleManager.SingleOrDefaultAsync(x => x.Name.Equals(RoleTypes.Admin.ToString()));
            }
            else
            {
                user.Role = await _roleManager.SingleOrDefaultAsync(x => x.Name.Equals(RoleTypes.User.ToString()));
            }


            var result = await _userManager.CreateUserAsync(user);
            if (!result)
            {
                return new Result() { Status = StatusType.Error };
            }

            return new Result() { Status = StatusType.Success, Message = "User registered" };
        }

        public async Task<Result> LoginAsync(LoginModel loginModel)
        {
            User userExisting;
            try
            {
                userExisting = await _userManager.SingleOrDefaultAsync(x =>
                    x.Email.Equals(loginModel.Login) || x.Name.Equals(loginModel.Login));

                if (userExisting == null ||
                    !await _userManager.CheckPassword(userExisting.PasswordHash, loginModel.Password))
                {
                    return new Result() { Status = StatusType.Error, Message = "Invalid username or password." };
                }
            }
            catch (ArgumentNullException e)
            {
                Log.Error(e.ToString());
                return new Result() { Status = StatusType.Error };
            }

            userExisting.Role = await _roleManager.FindByRoleIdAsync(userExisting.RoleId);

            var identity = GetIdentity(userExisting.Email, userExisting.Role.NormalizedName);

            var jwt = _jwtService.Generate(identity);

            return new Result() { Status = StatusType.Success, Message = "User logged in", Data = jwt };
        }

        public async Task<Result> TokenVerify(string jwt)
        {
            try
            {
                var token = _jwtService.Verify(jwt);
                var claims = token.Claims.ToList();


                var name = claims
                    .Where(x => x.Type == ClaimTypes.Name)
                    .Select(x => x.Value).SingleOrDefault();

                var role = claims
                    .Where(x => x.Type == ClaimTypes.Role)
                    .Select(x => x.Value).SingleOrDefault();

                var user = await _userManager.SingleOrDefaultAsync(x => x.Name.Equals(name) || x.Email.Equals(name));
                if (user == null)
                {
                    return new Result() { Status = StatusType.Error };
                }

                user.Role = await _roleManager.FindByRoleIdAsync(user.RoleId);

                if (role == null || !user.Role.NormalizedName.Equals(role.ToLower()))
                {
                    return new Result() { Status = StatusType.Error };
                }

                UserModel userModel = _mapper.Map<UserModel>(user);

                return new Result() { Status = StatusType.Success, Data = userModel };
            }
            catch (Exception e)
            {
                Log.Error(e.ToString());
                return new Result() { Status = StatusType.Error };
            }
        }

        private ClaimsIdentity GetIdentity(string email, string userRole)
        {
            var claims = new List<Claim>
            {
                new(ClaimsIdentity.DefaultNameClaimType, email),
                new(ClaimsIdentity.DefaultRoleClaimType, userRole)
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }

        private async Task<bool> CreateRolesIfNotExist()
        {
            try
            {
                if (await _roleManager.SingleOrDefaultAsync(x => x.Name.Equals(RoleTypes.Admin.ToString())) == null)
                {
                    await _roleManager.CreateRoleAsync(new Role(RoleTypes.Admin.ToString()));
                }

                if (await _roleManager.SingleOrDefaultAsync(x => x.Name.Equals(RoleTypes.Moderator.ToString())) == null)
                {
                    await _roleManager.CreateRoleAsync(new Role(RoleTypes.Moderator.ToString()));
                }

                if (await _roleManager.SingleOrDefaultAsync(x => x.Name.Equals(RoleTypes.User.ToString())) == null)
                {
                    await _roleManager.CreateRoleAsync(new Role(RoleTypes.User.ToString()));
                }

                return true;
            }
            catch (Exception e)
            {
                Log.Error(e.ToString());
                return false;
            }
        }
    }
}