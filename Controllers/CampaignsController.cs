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
    public class CampaignsController : ControllerBase
    {
        private readonly HabitatCRMContext _context;

        public CampaignsController(HabitatCRMContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery()]
        public IQueryable GetCampaigns()
        {
            return _context.Campaign
                .AsQueryable();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Campaign>> GetCampaign(Guid id)
        {
            var campaign = await _context.Campaign.FindAsync(id);

            if (campaign == null)
            {
                return NotFound();
            }

            return campaign;
        }

        // PUT: api/Campaigns/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaign(Guid id, Campaign campaign)
        {
            if (id != campaign.CampaignId)
            {
                return BadRequest();
            }

            _context.Entry(campaign).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignExists(id))
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

        // POST: api/Campaigns
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Campaign>> PostCampaign(Campaign campaign)
        {
            _context.Campaign.Add(campaign);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaign", new { id = campaign.CampaignId }, campaign);
        }

        // DELETE: api/Campaigns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaign(Guid id)
        {
            var campaign = await _context.Campaign.FindAsync(id);
            if (campaign == null)
            {
                return NotFound();
            }

            _context.Campaign.Remove(campaign);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampaignExists(Guid id)
        {
            return _context.Campaign.Any(e => e.CampaignId == id);
        }
    }
}
