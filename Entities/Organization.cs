using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HabitatCRM.Entities
{
    public class Organization
    {
        [Key]
        public Guid? OrganizationId { get; set; }
        public string OrganizationName { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? ModifiedDate { get; set; }

        public List<Donor> Donors { get; set; }
        public List<Donation> Donations { get; set; }
        public List<Campaign> Campaigns { get; set; }
    }
}
