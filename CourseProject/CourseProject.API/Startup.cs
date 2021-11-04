using System;
using System.Text;
using AutoMapper;
using CourseProject.API.Services.Cookie;
using CourseProject.BLL.Abstract;
using CourseProject.BLL.IdentityServices;
using CourseProject.BLL.IdentityServices.Jwt;
using CourseProject.DAL.Abstract;
using CourseProject.DAL.Factory;
using CourseProject.DAL.Identity;
using CourseProject.DAL.Models;
using CourseProject.DAL.Repository;
using CourseProject.DAL.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Serilog;
using Serilog.Events;

namespace CourseProject.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }
        private const string NamePolicy = "DefaultCors";


        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var hostHttp = Configuration.GetSection("ClientLocalHTTP").Value;

            services.AddCors(options =>
            {
                options.AddPolicy(NamePolicy, builder =>
                {
                    builder
                        .WithOrigins(hostHttp)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowed(_ => true)
                        .AllowCredentials();
                });
            });

            services.AddControllers();

            services.AddOptions();

            services.Configure<JwtAuthOptions>(Configuration.GetSection("JwtAuthOptions"));
            services.Configure<CookieConfigOptions>(Configuration.GetSection("CookieConfigOptions"));


            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ICryptography, Cryptography>();
            services.AddScoped<IContextFactory, AppDbContextFactory>();
            services.AddScoped<JwtService>();

            services.AddScoped<IRepository>(provider =>
                new GenericRepository(connectionString, provider.GetService<IContextFactory>()));

            services.AddScoped<IRoleManager<Role>>(provider =>
                new RoleManager<Role>(provider.GetService<IRepository>()));

            services.AddScoped<IUserManager<User>>(provider =>
                new UserManager<User>(provider.GetService<IRepository>(), provider.GetService<ICryptography>()));

            services.AddScoped<IAccountService>(provider =>
                new AccountService(
                    provider.GetService<IUserManager<User>>(),
                    provider.GetService<IRoleManager<Role>>(),
                    provider.GetService<JwtService>(),
                    provider.GetService<IMapper>()));

            services.AddMemoryCache();
            services.AddDistributedMemoryCache();

            services.AddSession();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateLifetime = true,
                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JwtAuthOptions:Key"])),
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddAuthorization();

            // services.AddDbContext<AppDbContext>(p => { p.UseSqlServer(connectionString); });

            services.AddSwaggerGen(swagger =>
            {
                swagger.SwaggerDoc("v1", new OpenApiInfo { Title = "CourseProject.API", Version = "v1" });
                swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description =
                        "Enter ‘Bearer’ [space] and then your valid token",
                });
                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(NamePolicy);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CourseProject.API v1"));
            }

            app.UseSerilogRequestLogging(options =>
            {
                options.MessageTemplate = "Handled {RequestPath}";
                options.GetLevel = (_, _, _) => LogEventLevel.Error;
                options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
                {
                    diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
                    diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
                };
            });

            app.UseHttpsRedirection();
            app.UseStatusCodePages();
            app.UseStaticFiles();
            app.UseSession();
            app.UseRouting();
            
            // TODO: move to middleware
            app.Use(async (context, next) =>
            {
                var token = context.Request.Cookies[Configuration["CookieConfigOptions:Key"]];
                if (!string.IsNullOrEmpty(token))
                    context.Request.Headers.Add("Authorization", "Bearer " + token);

                await next();
            });

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.None,
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.Always
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}