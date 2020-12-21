using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HabitatCRM.Entities
{
    public class Donor
    {
        [Key]
        public Guid DonorId { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public int? Age { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Type { get; set; }

        public string Gender { get; set; }

        public string GenderOther { get; set; }


        public List<Donation> Donations { get; set; }
        public Address Address { get; set; }
        public Organization Organization { get; set; }
        public Guid OrganizationId { get; set; }
        public Note Note { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? ModifiedDate { get; set; }

    }
}
