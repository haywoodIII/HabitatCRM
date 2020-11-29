using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HabitatCRM.Entities
{
    public class Campaign
    {
        [Key]
        public Guid CampaignId { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Goal { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }


        public List<Donation> Donations { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? ModifiedDate { get; set; }
    }
}
