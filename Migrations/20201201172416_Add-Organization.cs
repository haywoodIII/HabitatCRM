using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class AddOrganization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationId",
                table: "Donor",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Organization",
                columns: table => new
                {
                    OrganizationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organization", x => x.OrganizationId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Donor_OrganizationId",
                table: "Donor",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donor_Organization_OrganizationId",
                table: "Donor",
                column: "OrganizationId",
                principalTable: "Organization",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.Sql(
                @"CREATE TRIGGER [dbo].[Organization_UPDATE] ON [dbo].[Organization]
                    AFTER UPDATE
                AS
                BEGIN
                    SET NOCOUNT ON;

                    IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

                    DECLARE @OrganizationId uniqueidentifier 

                    SELECT @OrganizationId = INSERTED.OrganizationId
                    FROM INSERTED

                    UPDATE dbo.Organization
                    SET ModifiedDate = GETDATE()
                    WHERE OrganizationId = @OrganizationId
                END");
        }


        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donor_Organization_OrganizationId",
                table: "Donor");

            migrationBuilder.DropTable(
                name: "Organization");

            migrationBuilder.DropIndex(
                name: "IX_Donor_OrganizationId",
                table: "Donor");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Donor");
        }
    }
}
