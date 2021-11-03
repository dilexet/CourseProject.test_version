using System.ComponentModel.DataAnnotations;

namespace CourseProject.API.ViewModel
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Name { get; set; }

        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address")]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Required(ErrorMessage = "Confirm password is required")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}