using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HabitatCRM.Entities;

namespace HabitatCRM.Data
{
    public class HabitatCRMContext : DbContext
    {
        public HabitatCRMContext (DbContextOptions<HabitatCRMContext> options)
            : base(options)
        {
        }

        public DbSet<Donor> Donor { get; set; }

        public DbSet<Donation> Donation { get; set; }

        public DbSet<Address> Address { get; set; }

        public DbSet<Campaign> Campaign { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Donor>()
                .Property(b => b.CreatedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Donor>()
                .Property(b => b.ModifiedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Donation>()
                .Property(b => b.CreatedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Donation>()
                .Property(b => b.ModifiedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Address>()
                .Property(b => b.CreatedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Address>()
                .Property(b => b.ModifiedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Campaign>()
                .Property(b => b.CreatedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Campaign>()
                .Property(b => b.ModifiedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Organization>()
            .Property(b => b.CreatedDate)
            .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Organization>()
                .Property(b => b.ModifiedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Note>()
                .Property(b => b.CreatedDate)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Note>()
                .Property(b => b.ModifiedDate)
                .HasDefaultValueSql("getdate()");

            /*    modelBuilder.Entity<Donor>().HasData(new Donor 
                { 
                    DonorId = Guid.Parse("BA730422-6462-43B5-A817-BCC6CEC3BA50"),
                    Name = "Pioneer Library",
                    Age = 0,
                    Phone = "585-396-3584",
                    Email = "Pioneer@test.com",
                    Type = "Business",
                    Gender = "Other", 
                    GenderOther = "Non-Binary",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                });

                modelBuilder.Entity<Address>().HasData(new Address
                {
                    DonorId = Guid.Parse("BA730422-6462-43B5-A817-BCC6CEC3BA50"),
                    AddressId = Guid.Parse("92167885-87C4-49E6-A38D-909EFA6E80A4"),
                    Street = "85 Main Street",
                    City = "Newark", 
                    State = "NY", 
                    Zip = "14485",
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                });

                modelBuilder.Entity<Donation>().HasData(new Donation
                {
                    DonationId = Guid.Parse("40F5084B-E642-4254-A3BB-C67DDECE638D"),
                    DonorId = Guid.Parse("BA730422-6462-43B5-A817-BCC6CEC3BA50"),
                    CampaignId = Guid.Parse("019B91F4-71F3-4E9D-B383-6DE793F68C40"),
                    Amount = 20.00m,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                });

                modelBuilder.Entity<Campaign>().HasData(new Campaign
                {
                    CampaignId = Guid.Parse("019B91F4-71F3-4E9D-B383-6DE793F68C40"),
                    Name = "5k",
                    Goal = 5000m,
                    StartDate = new DateTime(2020, 4, 16),
                    EndDate = new DateTime(2020, 5, 16),
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                });*/
        }

        public DbSet<HabitatCRM.Entities.Organization> Organization { get; set; }

        public DbSet<HabitatCRM.Entities.Note> Note { get; set; }

    }

}
