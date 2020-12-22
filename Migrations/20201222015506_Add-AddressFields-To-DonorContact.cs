using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class AddAddressFieldsToDonorContact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address");

            migrationBuilder.DropForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_DonorContactId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "DonorContactId",
                table: "Address");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "DonorContact",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "DonorContact",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "DonorContact",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Zip",
                table: "DonorContact",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address",
                column: "DonorId",
                principalTable: "Donor",
                principalColumn: "DonorId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "City",
                table: "DonorContact");

            migrationBuilder.DropColumn(
                name: "State",
                table: "DonorContact");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "DonorContact");

            migrationBuilder.DropColumn(
                name: "Zip",
                table: "DonorContact");

            migrationBuilder.AddColumn<Guid>(
                name: "DonorContactId",
                table: "Address",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Address_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                unique: true,
                filter: "[DonorContactId] IS NOT NULL");

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
    }
}
