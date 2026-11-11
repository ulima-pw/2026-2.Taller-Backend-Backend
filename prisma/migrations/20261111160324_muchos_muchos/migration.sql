-- CreateTable
CREATE TABLE "Plataforma" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Plataforma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Videojuego_Plataforma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Videojuego_Plataforma_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Videojuego_Plataforma_B_index" ON "_Videojuego_Plataforma"("B");

-- AddForeignKey
ALTER TABLE "_Videojuego_Plataforma" ADD CONSTRAINT "_Videojuego_Plataforma_A_fkey" FOREIGN KEY ("A") REFERENCES "Plataforma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Videojuego_Plataforma" ADD CONSTRAINT "_Videojuego_Plataforma_B_fkey" FOREIGN KEY ("B") REFERENCES "Videojuego"("id") ON DELETE CASCADE ON UPDATE CASCADE;
