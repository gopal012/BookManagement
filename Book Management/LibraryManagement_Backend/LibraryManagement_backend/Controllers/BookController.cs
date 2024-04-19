using DAL.BookRepository;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBook _book;

        public BookController(IBook book) 
        {
            _book = book;
        }

        [HttpGet]
        public ActionResult GetAllBooks()
        {
            var books = _book.GetAllBooks().Result;
            return Ok(books);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody]Book book)
        {
            _book.AddBook(book);
            _book.SaveChanges();
            return Ok(book);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetBookById([FromRoute]Guid id) 
        {
            Book book = _book.GetBookById(id).Result;
            if(book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }


        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult DeleteBook([FromRoute]Guid id) 
        {
            Book book = _book.GetBookById(id).Result;
            if(book == null)
            {
                return NotFound();
            }
            _book.DeleteBook(book);
            _book.SaveChanges();
            return Ok(book);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult UpdateBook([FromRoute]Guid id, [FromBody]Book book) 
        {
            Book updateBook = _book.GetBookById(id).Result;
            if(book == null)
            {
                return NotFound();
            }
            _book.UpdateBook(book);
            _book.SaveChanges();
            return Ok(book);
        }

    }
}
