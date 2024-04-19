using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UserRepository
{
    public class UserRepository : IUser
    {
        private readonly BookContext _bookContext;

        public UserRepository(BookContext bookContext)
        {
            _bookContext = bookContext;
        }
        public void Add(User user)
        {
            _bookContext.Users.Add(user);
        }

        public async Task<User> GetUserById(int id)
        {
            return await _bookContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<User>> GetUsers()
        {
            return await _bookContext.Users.ToListAsync();
        }

        public void UpdateUser(User user)
        {
            User updateUser = _bookContext.Users.FirstOrDefault(x=>x.Id == user.Id);
            if (updateUser != null)
            {
                updateUser.Name = user.Name;
                updateUser.UserName = user.UserName;
                updateUser.Token_Availaible = user.Token_Availaible;
            }
        }
                
        public void SaveChanges()
        {
            _bookContext.SaveChanges();
        }
    }
}
