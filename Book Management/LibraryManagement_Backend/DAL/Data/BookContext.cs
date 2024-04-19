using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        Id = 1,
                        Name = "Gopal Goyal",
                        UserName = "gopalgoyal012",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        Token_Availaible = 1,
                        Role = "User",
                        Token = ""
                    },
                    new User
                    {
                        Id = 2,
                        Name = "Ram Kumar",
                        UserName = "ramkumar123",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        Token_Availaible = 1,
                        Role = "User",
                        Token = ""
                    },
                    new User
                    {
                        Id = 3,
                        Name = "Sam Gupta",
                        UserName = "sam1997",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        Token_Availaible = 1,
                        Role = "User",
                        Token = ""
                    },
                    new User
                    {
                        Id = 4,
                        Name = "Vikas Khanna",
                        UserName = "vickykh2209",
                        Password = "1234567890",
                        ConfirmPassword = "1234567890",
                        Token_Availaible = 1,
                        Role = "User",
                        Token = ""
                    }
                );
        }
    }
}
