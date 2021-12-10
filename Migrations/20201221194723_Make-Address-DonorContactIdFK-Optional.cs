using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class MakeAddressDonorContactIdFKOptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_DonorContactId",
                table: "Address");

            migrationBuilder.AlterColumn<Guid>(
                name: "DonorContactId",
                table: "Address",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Address_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                unique: true,
                filter: "[DonorContactId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                principalTable: "DonorContact",
                principalColumn: "DonorContactId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address");

            migrationBuilder.DropIndex(
                name: "IX_Address_DonorContactId",
                table: "Address");

            migrationBuilder.AlterColumn<Guid>(
                name: "DonorContactId",
                table: "Address",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Address_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                principalTable: "DonorContact",
                principalColumn: "DonorContactId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
