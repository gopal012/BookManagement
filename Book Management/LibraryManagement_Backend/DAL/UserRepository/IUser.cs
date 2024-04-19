using DOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UserRepository
{
    public interface IUser
    {
        Task<List<User>> GetUsers();
        Task<User> GetUserById(int id);
        void Add(User user);
        void UpdateUser(User user);
        void SaveChanges();
    }
}
