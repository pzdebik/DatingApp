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

            // jeśli nie miał jeszcze urodzin, odejmij 1 rok od wyliczeń ze zmiennej age
            if (dob > today.AddYears(-age)) age--; 

            return age;
        } 
    }
}