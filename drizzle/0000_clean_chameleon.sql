CREATE TABLE "TicTacToe" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"Mode" varchar(255) NOT NULL,
	"Board" jsonb,
	"Player" varchar(255) NOT NULL,
	"End" varchar(255)
);
