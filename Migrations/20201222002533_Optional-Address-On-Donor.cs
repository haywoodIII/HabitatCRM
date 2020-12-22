using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class OptionalAddressOnDonor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_DonorId",
                table: "Address");

            migrationBuilder.AlterColumn<Guid>(
                name: "DonorId",
                table: "Address",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Address_DonorId",
                table: "Address",
                column: "DonorId",
                unique: true,
                filter: "[DonorId] IS NOT NULL");

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

            migrationBuilder.DropIndex(
                name: "IX_Address_DonorId",
                table: "Address");

            migrationBuilder.AlterColumn<Guid>(
                name: "DonorId",
                table: "Address",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Address_DonorId",
                table: "Address",
                column: "DonorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Donor_DonorId",
                table: "Address",
                column: "DonorId",
                principalTable: "Donor",
                principalColumn: "DonorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
