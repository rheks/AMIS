using APIAssets.Repositories.Interface;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net;

namespace APIAssets.Base
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class BaseController<Entity, Repository, Key> : ControllerBase
        where Entity : class
        where Repository : IRepository<Entity, Key>
    {
        private readonly Repository repository;
        public BaseController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpPost]
        public virtual ActionResult Create(Entity entity)
        {
            var response = repository.Create(entity);
            if (response == 1)
            {
                return StatusCode(201, new { Status = HttpStatusCode.Created, Message = "Data successfully created", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data failed to create", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }

        [HttpGet]
        public virtual IActionResult Read()
        {
            var response = repository.Read();
            if (response.Count() >= 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.OK, Message = $"{response.Count()} data found", Data = response });
            } 
            else if (response.Count() == 0)
            {
                return StatusCode(404, new { Status = HttpStatusCode.NotFound, Message = "Data not found", Data = response });
            } 
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }

        [HttpGet]
        [Route("{key}")]
        public virtual ActionResult Read(Key key)
        {
            var response = repository.Read(key);
            if (response != null)
            {
                return StatusCode(200, new { Status = HttpStatusCode.OK, Message = $"Data with code {key} found", Data = response });
            }
            else if (response == null)
            {
                return StatusCode(404, new { Status = HttpStatusCode.NotFound, Message = $"Data with code {key} not found", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }

        [HttpPut]
        public virtual ActionResult Update(Entity entity)
        {
            var response = repository.Update(entity);
            if (response == 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.OK, Message = "Data successfully updated", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data failed to update", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }

        [HttpDelete]
        [Route("{key}")]
        public virtual ActionResult Delete(Key key)
        {
            var response = repository.Delete(key);
            if (response == 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.OK, Message = "Data successfully deleted", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Data failed to delete", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }
    }
}
