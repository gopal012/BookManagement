using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.BookRepository
{
    public class BookRepository : IBook
    {
        private readonly BookContext _bookContext;

        public BookRepository(BookContext bookContext)
        {
            _bookContext = bookContext;
        }

        public async void AddBook(Book book)
        {
            await _bookContext.Books.AddAsync(book);
        }

        public void DeleteBook(Book book)
        {
            _bookContext.Books.Remove(book);
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await _bookContext.Books.ToListAsync();
        }

        public async Task<Book> GetBookById(Guid id)
        {
            return await _bookContext.Books.FirstOrDefaultAsync(x => x.ID == id);
        }

        public void SaveChanges()
        {
            _bookContext.SaveChanges();
        }

        public void UpdateBook(Book book)
        {
            Book updateBook = _bookContext.Books.FirstOrDefault(x=>x.ID == book.ID);
            if(updateBook != null)
            {
                updateBook.ID = book.ID;
                updateBook.BookName = book.BookName;
                updateBook.Rating = book.Rating;
                updateBook.Author = book.Author;
                updateBook.Genre = book.Genre;
                updateBook.Is_Book_Availaible = book.Is_Book_Availaible;
                updateBook.Description = book.Description;
                updateBook.Lent_By_UserId = book.Lent_By_UserId;
                updateBook.Borrowed_By_UserId = book.Borrowed_By_UserId;
            }

        }
    }
}
