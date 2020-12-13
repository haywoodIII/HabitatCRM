using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HabitatCRM.Data;
using HabitatCRM.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HabitatCRM.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class DonorProfileController : ControllerBase
    {
        private readonly HabitatCRMContext _context;

        public DonorProfileController(HabitatCRMContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DonorProfile>> GetProfile(Guid id)
        {
            var data = await (from d in _context.Donor
                                 join a in _context.Donation on d.DonorId equals a.DonorId
                                 where d.DonorId == id
                                 select new { DonationHistory = a.CreatedDate, DonorCreationDate = d.CreatedDate }).ToListAsync();

            var donationHistory = data.Select(d => d.DonationHistory).ToList();
            var donorCreatedDate = data.Select(d => d.DonorCreationDate).First();

            var profile = new DonorProfile() { DonationHistory = donationHistory, DonorCreationDate = donorCreatedDate };
            
            return profile;
        }
    }
}
