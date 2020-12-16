using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class AddOrganizationToCampaignAndDonation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationId",
                table: "Donation",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationId",
                table: "Campaign",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Donation_OrganizationId",
                table: "Donation",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Campaign_OrganizationId",
                table: "Campaign",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Campaign_Organization_OrganizationId",
                table: "Campaign",
                column: "OrganizationId",
                principalTable: "Organization",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Donation_Organization_OrganizationId",
                table: "Donation",
                column: "OrganizationId",
                principalTable: "Organization",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campaign_Organization_OrganizationId",
                table: "Campaign");

            migrationBuilder.DropForeignKey(
                name: "FK_Donation_Organization_OrganizationId",
                table: "Donation");

            migrationBuilder.DropIndex(
                name: "IX_Donation_OrganizationId",
                table: "Donation");

            migrationBuilder.DropIndex(
                name: "IX_Campaign_OrganizationId",
                table: "Campaign");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Donation");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Campaign");
        }
    }
}
