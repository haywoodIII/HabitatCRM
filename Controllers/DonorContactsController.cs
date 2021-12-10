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
using Microsoft.AspNet.OData.Routing;

namespace HabitatCRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorContactsController : ControllerBase
    {
        private readonly HabitatCRMContext _context;

        public DonorContactsController(HabitatCRMContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery()]
        public IQueryable Get()
        {
            return _context.DonorContact
                .AsQueryable();
        }

        [ODataRoute("{key}")]
        public async Task<ActionResult<DonorContact>> GetDonorContact([FromODataUri] Guid key)
        {
            var donorContact = await _context.DonorContact.FindAsync(key);

            if (donorContact == null)
            {
                return NotFound();
            }

            return donorContact;
        }


        [ODataRoute("({key})")]
        [HttpPatch]
        public async Task<IActionResult> PatchDonorContact([FromODataUri] Guid key, [FromBody] Delta<DonorContact> donorContact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _context.DonorContact.FindAsync(key);

            if (entity == null)
            {
                return NotFound();
            }

            donorContact.Patch(entity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonorContactExists(key))
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

        // PUT: api/DonorContacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDonorContact(Guid id, DonorContact donorContact)
        {
            if (id != donorContact.DonorContactId)
            {
                return BadRequest();
            }

            _context.Entry(donorContact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonorContactExists(id))
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

        // POST: api/DonorContacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DonorContact>> PostDonorContact(DonorContact donorContact)
        {
            _context.DonorContact.Add(donorContact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonorContact", new { id = donorContact.DonorContactId }, donorContact);
        }

        // DELETE: api/DonorContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonorContact(Guid id)
        {
            var donorContact = await _context.DonorContact.FindAsync(id);
            if (donorContact == null)
            {
                return NotFound();
            }

            _context.DonorContact.Remove(donorContact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DonorContactExists(Guid id)
        {
            return _context.DonorContact.Any(e => e.DonorContactId == id);
        }
    }
}
