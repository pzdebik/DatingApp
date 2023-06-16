namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        // jest to metoda rozszerzenia przez co musismy wskazać co rozszerzamy (tutaj DateOnly)
        public static int CalculateAge(this DateOnly dob)
        {
            // obliczenia nie uwzględniają lat przestępnych 
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var age = today.Year - dob.Year;

            // -age oznacza, np. -30
            // metoda AddYears odejmuję wartość -age od dzisiejszego roku, zrównując się z rokiem urodzin
            // jeśli data w dob jest większa od daty w today, oznacza, że user nie miał jeszcze urodzin
            if (dob > today.AddYears(-age)) age--; 

            return age;
        } 
    }
}