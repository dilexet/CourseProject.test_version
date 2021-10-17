using System.ComponentModel.DataAnnotations;

namespace CourseProject.API.ViewModel
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Login { get; set; }
        
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}