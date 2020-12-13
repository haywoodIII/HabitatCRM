using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HabitatCRM.Entities
{
    public class DonorProfile
    {
        public List<DateTime?> DonationHistory { get; set; }

        public DateTime? DonorCreationDate { get; set; }
    }
}
