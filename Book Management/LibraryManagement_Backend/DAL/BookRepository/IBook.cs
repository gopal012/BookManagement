using DOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.BookRepository
{
    public interface IBook
    {
        public Task<List<Book>> GetAllBooks();
        public Task<Book> GetBookById(Guid id);
        public void AddBook(Book book);
        public void DeleteBook(Book book);
        public void UpdateBook(Book book);
        public void SaveChanges();
    }
}
