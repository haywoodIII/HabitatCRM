using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class AddDonorContactEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DonorContactId",
                table: "Address",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "DonorContact",
                columns: table => new
                {
                    DonorContactId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DonorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonorContact", x => x.DonorContactId);
                    table.ForeignKey(
                        name: "FK_DonorContact_Donor_DonorId",
                        column: x => x.DonorId,
                        principalTable: "Donor",
                        principalColumn: "DonorId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DonorContact_DonorId",
                table: "DonorContact",
                column: "DonorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address",
                column: "DonorContactId",
                principalTable: "DonorContact",
                principalColumn: "DonorContactId",
                onDelete: ReferentialAction.Cascade);


            migrationBuilder.Sql(
            @"CREATE TRIGGER [dbo].[DonorContact_UPDATE] ON [dbo].[DonorContact]
                    AFTER UPDATE
                AS
                BEGIN
                    SET NOCOUNT ON;

                    IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

                    DECLARE @DonorContactId uniqueidentifier 

                    SELECT @DonorContactId = INSERTED.DonorContactId
                    FROM INSERTED

                    UPDATE dbo.DonorContact
                    SET ModifiedDate = GETDATE()
                    WHERE DonorContactId = @DonorContactId
                END");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_DonorContact_DonorContactId",
                table: "Address");

            migrationBuilder.DropTable(
                name: "DonorContact");

            migrationBuilder.DropIndex(
                name: "IX_Address_DonorContactId",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "DonorContactId",
                table: "Address");
        }
    }
}
