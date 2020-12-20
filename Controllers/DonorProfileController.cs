using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HabitatCRM.Data;
using HabitatCRM.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
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
                              select new
                              {
                                  DonationHistory = a.Date,
                                  DonorCreationDate = d.CreatedDate,
                                  DonationSum = d.Donations.Select(s => s.Amount).Sum(),
                                  DonationTotal = d.Donations.Select(s => s).Count()
                              }).ToListAsync();

            List<DateTime?> donationHistory = data.Select(d => d.DonationHistory).ToList();
            DateTime? donorCreatedDate = data.Select(d => d.DonorCreationDate).First();
            decimal totalAmountDonated = data.Select(d => d.DonationSum).First();
            int totalDonations = data.Select(d => d.DonationTotal).First();

            var profile = new DonorProfile()
            {
                DonationHistory = donationHistory,
                DonorCreationDate = donorCreatedDate,
                TotalAmountDonated = totalAmountDonated,
                TotalDonations = totalDonations
            };
            
            return profile;
        }
    }
}
