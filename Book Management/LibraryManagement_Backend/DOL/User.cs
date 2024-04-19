using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string UserName { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Minimum 8 characters required")]
        public string Password { get; set; }

        [Required]
        [NotMapped]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        [DefaultValue(1)]
        public int Token_Availaible { get; set; }

        [DefaultValue("User")]
        public string Role { get; set; }

        [DefaultValue("")]
        public string Token { get; set; }
    }
}
