using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HabitatCRM.Entities
{
    public class Note
    {
        public Guid NoteId { get; set; }
        public string Text { get; set; }

        public Donor Donor { get; set; }
        public Guid DonorId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? ModifiedDate { get; set; }
    }
}
