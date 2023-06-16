using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config)
            {
                services.AddDbContext<DataContext>(opt =>
                {
                    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });
                services.AddCors();
                services.AddScoped<ITokenService, TokenService>(); // scoped, transient i singleton - jak długo serwis "żyje"
                services.AddScoped<IUserRepository, UserRepository>();
                services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

                return services;
            }
    }
}