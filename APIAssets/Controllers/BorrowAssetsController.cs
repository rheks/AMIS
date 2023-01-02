﻿using APIAssets.Base;
using APIAssets.Models;
using APIAssets.Repositories.Data;
using APIAssets.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace APIAssets.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowAssetsController : BaseController<BorrowAsset, BorrowAssetsRepository, int>
    {
        private readonly BorrowAssetsRepository borrowAssetsRepository;
        public BorrowAssetsController(BorrowAssetsRepository borrowAssetsRepository) : base(borrowAssetsRepository)
        {
            this.borrowAssetsRepository = borrowAssetsRepository;
        }

        [HttpPost]
        [Route("Request")]
        //[Authorize]
        public ActionResult RequestAsset(BorrowAsset borrowAsset)
        {
            var response = borrowAssetsRepository.RequestAsset(borrowAsset);

            if (response == 1)
            {
                return StatusCode(201, new { Status = HttpStatusCode.Created, Message = "Request asset successfully created", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Request asset failed to create", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }
        
        [HttpPut]
        [Route("Request")]
        //[Authorize]
        public ActionResult UpdateRequestAsset(BorrowAsset borrowAsset)
        {
            var response = borrowAssetsRepository.RequestAsset(borrowAsset);

            if (response == 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.Created, Message = "Request asset successfully updated", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Request asset failed to update", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }
        
        [HttpDelete]
        [Route("Request")]
        public ActionResult ReturnAsset(BorrowAsset borrowAsset)
        {
            var response = borrowAssetsRepository.ReturnAsset(borrowAsset);

            if (response == 1)
            {
                return StatusCode(200, new { Status = HttpStatusCode.Created, Message = "Return asset successfully", Data = response });
            }
            else if (response == 0)
            {
                return StatusCode(400, new { Status = HttpStatusCode.BadRequest, Message = "Return asset failed", Data = response });
            }
            else
            {
                return StatusCode(500, new { Status = HttpStatusCode.InternalServerError, Message = "Internal server error", Data = response });
            }
        }
    }
}
