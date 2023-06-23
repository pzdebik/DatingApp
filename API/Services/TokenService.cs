using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config) // parametr umożliwia przekazanie konfiguracji aplikacji do usługi TokenService, w tym wskazanie klucza używanego do podpisywania tokenów.
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])); // klucz używany do podpisywania tokenów JWT.
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature); // Służy on do podpisania tokena za pomocą klucza _key i algorytmu HMACSHA512.

            //opis, który zawiera informacje o roszczeniach, ważności tokena, podpisie i innych ustawieniach.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds // Podpis tokena jest ustawiany na wartość creds.
            };

            var tokenHandler = new JwtSecurityTokenHandler(); // Tworzy to obiekt tokena JWT.

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token); // zwraca tekstową reprezentację tokena
        }
    }
}