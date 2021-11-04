using System;
using System.Threading.Tasks;
using AutoMapper;
using CourseProject.API.Services.Cookie;
using CourseProject.API.ViewModel;
using CourseProject.BLL.Abstract;
using CourseProject.BLL.Enums;
using CourseProject.BLL.Models;
using CourseProject.BLL.SharedModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serilog;

// ReSharper disable TemplateIsNotCompileTimeConstantProblem
namespace CourseProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IOptions<CookieConfigOptions> _cookieOptions;


        public AuthenticateController(IAccountService accountService, IMapper mapper,
            IOptions<CookieConfigOptions> cookieOptions)
        {
            _accountService = accountService;
            _mapper = mapper;
            _cookieOptions = cookieOptions;
        }

        // TODO: optimize Register(1:12 seconds)
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            Result result;

            try
            {
                result = await _accountService.RegisterAsync(_mapper.Map<RegisterModel>(registerViewModel));
            }
            catch (Exception e)
            {
                Log.Error(e.ToString());
                return BadRequest(new Response()
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Status = "error",
                    Message = "Server error"
                });
            }

            if (result.Status.Equals(StatusType.Error))
            {
                return BadRequest(new Response()
                {
                    Code = StatusCodes.Status400BadRequest,
                    Status = "error",
                    Message = result.Message
                });
            }

            return Ok(new Response()
            {
                Code = StatusCodes.Status201Created,
                Status = "success",
                Message = result.Message
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            Result result;

            try
            {
                result = await _accountService.LoginAsync(_mapper.Map<LoginModel>(loginViewModel));
            }
            catch (Exception e)
            {
                Log.Error(e.ToString());
                return BadRequest(new Response()
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Status = "error",
                    Message = "Server error",
                });
            }

            if (result.Status.Equals(StatusType.Error))
            {
                return BadRequest(new Response()
                {
                    Code = StatusCodes.Status400BadRequest,
                    Status = "error",
                    Message = result.Message
                });
            }

            string key = _cookieOptions.Value.Key;
            int lifeTime = Convert.ToInt32(_cookieOptions.Value.LifeTime);
            HttpContext.Response.Cookies.Append(key, result.Data.ToString() ?? string.Empty,
                new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    Expires = DateTime.Today.AddDays(lifeTime),
                }
            );

            return Ok(new Response()
            {
                Code = StatusCodes.Status200OK,
                Status = "success",
                Message = result.Message
            });
        }


        [HttpGet("logout")]
        public IActionResult Logout()
        {
            var jwt = HttpContext.Request.Cookies[_cookieOptions.Value.Key];
            if (jwt == null)
            {
                return Unauthorized(new Response
                {
                    Code = StatusCodes.Status401Unauthorized,
                    Status = "error",
                    Message = "User is unauthorized"
                });
            }

            HttpContext.Response.Cookies.Append(_cookieOptions.Value.Key, jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.Now.AddYears(-1),
            });
            return Ok(new Response
            {
                Code = StatusCodes.Status200OK,
                Status = "success",
                Message = "User is logout"
            });
        }

        [HttpGet("token_verify")]
        public async Task<IActionResult> TokenVerify()
        {
            var jwt = Request.Cookies[_cookieOptions.Value.Key];
            var result = await _accountService.TokenVerify(jwt);
            if (result.Status == StatusType.Error)
            {
                return Unauthorized(new Response()
                {
                    Code = StatusCodes.Status401Unauthorized,
                    Status = "error",
                    Message = "User is unauthorized"
                });
            }

            UserViewModel user = _mapper.Map<UserViewModel>(result.Data);
            return Ok(new Response()
            {
                Code = StatusCodes.Status200OK,
                Status = "success",
                Message = "User is authorized",
                Data = user
            });
        }
    }
}