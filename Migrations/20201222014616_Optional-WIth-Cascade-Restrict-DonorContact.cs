using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class OptionalWIthCascadeRestrictDonorContact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address",
                column: "DonorId",
                principalTable: "Donor",
                principalColumn: "DonorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                principalTable: "DonorContact",
                principalColumn: "DonorContactId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address",
                column: "DonorId",
                principalTable: "Donor",
                principalColumn: "DonorId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                principalTable: "DonorContact",
                principalColumn: "DonorContactId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
