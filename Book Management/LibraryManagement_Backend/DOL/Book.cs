using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class Book
    {
        [Key]
        public Guid ID { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string BookName { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string Author { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string Genre { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [DefaultValue(true)]
        public bool Is_Book_Availaible { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string Description { get; set; }

        [Required]
        public int Lent_By_UserId { get; set; }

        [Required]
        public int Borrowed_By_UserId { get; set; }

    }
}
