using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HabitatCRM.Entities
{
    public class Donation
    {
        [Key]
        public Guid DonationId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public Guid DonorId { get; set; }
        public DateTime? Date { get; set; }
        public Donor Donor { get; set; }

        public Campaign Campaign { get; set; }
        public Guid? CampaignId { get; set; }

        public Organization Organization { get; set; }
        public Guid OrganizationId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? ModifiedDate { get; set; }

    }
}
