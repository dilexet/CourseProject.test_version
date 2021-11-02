using System;
using System.Threading.Tasks;
using AutoMapper;
using CourseProject.API.Services.Cookie;
using CourseProject.API.ViewModel;
using CourseProject.BLL.Abstract;
using CourseProject.BLL.Enums;
using CourseProject.BLL.Models;
using CourseProject.BLL.SharedModels;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Result result;

            try
            {
                result = await _accountService.RegisterAsync(_mapper.Map<RegisterModel>(registerViewModel));
            }
            catch (Exception e)
            {
                Log.Error(e.ToString());
                return BadRequest();
            }

            Response response = _mapper.Map<Response>(result);

            if (result.Status.Equals(StatusType.Error))
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Result result;
            try
            {
                result = await _accountService.LoginAsync(_mapper.Map<LoginModel>(loginViewModel));
            }
            catch (Exception e)
            {
                Log.Error(e.ToString());
                return BadRequest();
            }

            Response response = _mapper.Map<Response>(result);

            if (result.Status.Equals(StatusType.Error))
            {
                return NotFound(response);
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
            return Ok(response);
        }


        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var jwt = Request.Cookies[_cookieOptions.Value.Key];
            if (jwt == null)
            {
                return Unauthorized(new Response
                {
                    Status = "error", Message = "User is not authorized"
                });
            }

            Response.Cookies.Append(_cookieOptions.Value.Key, jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.Now.AddYears(-1),
            });
            return Ok(new Response
            {
                Status = "success", Message = "Logout is success"
            });
        }

        [Authorize]
        [HttpPost("token_verify")]
        public async Task<IActionResult> TokenVerify()
        {
            var jwt = Request.Cookies[_cookieOptions.Value.Key];
            var result = await _accountService.TokenVerify(jwt);
            var response = _mapper.Map<Response>(result);
            if (result.Status == StatusType.Error)
            {
                return Unauthorized(response);
            }

            UserViewModel user = _mapper.Map<UserViewModel>(result.Data);
            return Ok(user);
        }
    }
}