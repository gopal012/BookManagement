using DAL.UserRepository;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibraryManagement_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetUserById([FromRoute] int id) 
        {  
            User user = _user.GetUserById(id).Result;
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateUser([FromRoute] int id, [FromBody]User user) 
        {
            User updateUser = _user.GetUserById(id).Result;
            if(updateUser == null)
            {
                return NotFound();
            }
            _user.UpdateUser(user);
            _user.SaveChanges();
            return Ok(user);

        }

        [HttpPost("authenticate")]
        public ActionResult Authenticate([FromBody] LoginUser loginObj)
        {
            if (loginObj.UserName == null || loginObj.Password == null)
            {
                return BadRequest();
            }

            var users = _user.GetUsers().Result;
            var user = users.FirstOrDefault(x => x.UserName == loginObj.UserName);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found !" });
            }

            if (loginObj.Password != user.Password)
            {
                return BadRequest(new { Message = "Invalid Credentials !" });
            }

            user.Token = CreateJwtToken(user);
            return Ok(user);
        }

        private string CreateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Name),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())

            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);

        }
    }
}
