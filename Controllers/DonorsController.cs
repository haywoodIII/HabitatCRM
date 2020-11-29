using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HabitatCRM.Data;
using HabitatCRM.Entities;
using Microsoft.AspNetCore.Authorization;

namespace HabitatCRM.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        private readonly HabitatCRMContext _context;

        public DonorsController(HabitatCRMContext context)
        {
            _context = context;
        }

        // GET: api/Donors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Donor>>> GetDonor()
        {
            return await _context.Donor.Include(donor => donor.Address).ToListAsync();
        }

        // GET: api/Donors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Donor>> GetDonor(Guid id)
        {
            var donor = await _context.Donor.FindAsync(id);

            if (donor == null)
            {
                return NotFound();
            }

            return donor;
        }

        // PUT: api/Donors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonor(Guid id, Donor donor)
        {
            if (id != donor.DonorId)
            {
                return BadRequest();
            }

            _context.Entry(donor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonorExists(id))
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

        // POST: api/Donors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Donor>> PostDonor(Donor donor)
        {
            _context.Donor.Add(donor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonor", new { id = donor.DonorId }, donor);
        }

        // DELETE: api/Donors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonor(Guid id)
        {
            var donor = await _context.Donor.FindAsync(id);
            if (donor == null)
            {
                return NotFound();
            }

            _context.Donor.Remove(donor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DonorExists(Guid id)
        {
            return _context.Donor.Any(e => e.DonorId == id);
        }
    }
}
