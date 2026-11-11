/*
  Warnings:

  - You are about to drop the column `categoria` on the `Videojuego` table. All the data in the column will be lost.
  - Added the required column `idCategoria` to the `Videojuego` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videojuego" DROP COLUMN "categoria",
ADD COLUMN     "idCategoria" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Videojuego" ADD CONSTRAINT "Videojuego_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
