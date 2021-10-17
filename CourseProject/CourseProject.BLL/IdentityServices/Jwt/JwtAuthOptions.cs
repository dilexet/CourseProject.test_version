namespace CourseProject.BLL.IdentityServices.Jwt
{
    /// <summary>
    /// АУФ
    /// </summary>
    public class JwtAuthOptions
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int LifeTime { get; set; }
    }
}