using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HabitatCRM.Migrations
{
    public partial class AddNoteEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Note",
                columns: table => new
                {
                    NoteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DonorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()"),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Note", x => x.NoteId);
                    table.ForeignKey(
                        name: "FK_Note_Donor_DonorId",
                        column: x => x.DonorId,
                        principalTable: "Donor",
                        principalColumn: "DonorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Note_DonorId",
                table: "Note",
                column: "DonorId",
                unique: true);


            migrationBuilder.Sql(
            @"CREATE TRIGGER [dbo].[Note_UPDATE] ON [dbo].[Note]
                    AFTER UPDATE
                AS
                BEGIN
                    SET NOCOUNT ON;

                    IF ((SELECT TRIGGER_NESTLEVEL()) > 1) RETURN;

                    DECLARE @NoteId uniqueidentifier 

                    SELECT @NoteId = INSERTED.NoteId
                    FROM INSERTED

                    UPDATE dbo.Note
                    SET ModifiedDate = GETDATE()
                    WHERE NoteId = @NoteId
            END");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Note");
        }
    }
}
