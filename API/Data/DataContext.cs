
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // nie muszę tworzyć DbSeta dla encji Photo, dlatego, że:
        // - nie chcę mieć zdjęć, które nie są przypisane do usera
        // - nie chcę, aby jeden user mógł dodawać zdj drugiemu userowi
        // - nie chcę móc wysyłać zapytań do bazy, aby pobrać jakieś zdjęcie dla randomowego usera
        public DbSet<AppUser> Users { get; set; }
    }
}