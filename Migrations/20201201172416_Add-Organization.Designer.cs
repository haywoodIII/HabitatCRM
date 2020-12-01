﻿// <auto-generated />
using System;
using HabitatCRM.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HabitatCRM.Migrations
{
    [DbContext(typeof(HabitatCRMContext))]
    [Migration("20201201172416_Add-Organization")]
    partial class AddOrganization
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("HabitatCRM.Entities.Address", b =>
                {
                    b.Property<Guid>("AddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<Guid>("DonorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("ModifiedDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Zip")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AddressId");

                    b.HasIndex("DonorId")
                        .IsUnique();

                    b.ToTable("Address");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Campaign", b =>
                {
                    b.Property<Guid>("CampaignId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Goal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("ModifiedDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("CampaignId");

                    b.ToTable("Campaign");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Donation", b =>
                {
                    b.Property<Guid>("DonationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid?>("CampaignId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<Guid>("DonorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("ModifiedDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.HasKey("DonationId");

                    b.HasIndex("CampaignId");

                    b.HasIndex("DonorId");

                    b.ToTable("Donation");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Donor", b =>
                {
                    b.Property<Guid>("DonorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GenderOther")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifiedDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("OrganizationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("DonorId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Donor");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Organization", b =>
                {
                    b.Property<Guid>("OrganizationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrganizationName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OrganizationId");

                    b.ToTable("Organization");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Address", b =>
                {
                    b.HasOne("HabitatCRM.Entities.Donor", "Donor")
                        .WithOne("Address")
                        .HasForeignKey("HabitatCRM.Entities.Address", "DonorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Donor");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Donation", b =>
                {
                    b.HasOne("HabitatCRM.Entities.Campaign", "Campaign")
                        .WithMany("Donations")
                        .HasForeignKey("CampaignId");

                    b.HasOne("HabitatCRM.Entities.Donor", "Donor")
                        .WithMany("Donations")
                        .HasForeignKey("DonorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Campaign");

                    b.Navigation("Donor");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Donor", b =>
                {
                    b.HasOne("HabitatCRM.Entities.Organization", "Organization")
                        .WithMany("Donors")
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organization");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Campaign", b =>
                {
                    b.Navigation("Donations");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Donor", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Donations");
                });

            modelBuilder.Entity("HabitatCRM.Entities.Organization", b =>
                {
                    b.Navigation("Donors");
                });
#pragma warning restore 612, 618
        }
    }
}
