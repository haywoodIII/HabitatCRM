using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HabitatCRM.Data;
using HabitatCRM.Entities;
using Microsoft.AspNet.OData;

namespace HabitatCRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationsController : ControllerBase
    {
        private readonly HabitatCRMContext _context;

        public DonationsController(HabitatCRMContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery()]
        public IQueryable GetCampaigns()
        {
            return _context.Donation
                .AsQueryable();
        }

        // GET: api/Donations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Donation>>> GetDonations(Guid id)
        {
            var donations = (from dr in _context.Donor
                             join don in _context.Donation
                             on dr.DonorId equals don.DonorId
                             where dr.DonorId == id
                             select new Donation { CreatedDate = don.CreatedDate, Amount = don.Amount }).ToListAsync();

            return Ok(donations);
        }

        // PUT: api/Donations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonation(Guid id, Donation donation)
        {
            if (id != donation.DonationId)
            {
                return BadRequest();
            }

            _context.Entry(donation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Donations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Donation>> PostDonation(Donation donation)
        {
            _context.Donation.Add(donation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonation", new { id = donation.DonationId }, donation);
        }

        // DELETE: api/Donations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonation(Guid id)
        {
            var donation = await _context.Donation.FindAsync(id);
            if (donation == null)
            {
                return NotFound();
            }

            _context.Donation.Remove(donation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DonationExists(Guid id)
        {
            return _context.Donation.Any(e => e.DonationId == id);
        }
    }
}
