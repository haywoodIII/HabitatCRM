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
    public class NotesController : ControllerBase
    {
        private readonly HabitatCRMContext _context;

        public NotesController(HabitatCRMContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery()]
        public IQueryable GetNotes()
        {
            return _context.Note
                .AsQueryable();
        }

        // GET: api/Notes/5
        [ODataRoute("{id}")]

        public async Task<ActionResult<Note>> Get([FromODataUri] Guid key)
        {
            var note = await _context.Note.FindAsync(key);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(Guid id, Note note)
        {
            if (id != note.NoteId)
            {
                return BadRequest();
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
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

        [ODataRoute("({key})")]
        [HttpPatch]
        public async Task<IActionResult> PatchNote([FromODataUri] Guid key, [FromBody] Delta<Note> note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _context.Note.FindAsync(key);

            if (entity == null)
            {
                return NotFound();
            }

            note.Patch(entity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(key))
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

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            _context.Note.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = note.NoteId }, note);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var note = await _context.Note.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Note.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteExists(Guid id)
        {
            return _context.Note.Any(e => e.NoteId == id);
        }
    }
}
