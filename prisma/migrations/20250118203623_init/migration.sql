/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Resumo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resumo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autor" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL
);
INSERT INTO "new_Resumo" ("autor", "conteudo", "id", "titulo") SELECT "autor", "conteudo", "id", "titulo" FROM "Resumo";
DROP TABLE "Resumo";
ALTER TABLE "new_Resumo" RENAME TO "Resumo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
