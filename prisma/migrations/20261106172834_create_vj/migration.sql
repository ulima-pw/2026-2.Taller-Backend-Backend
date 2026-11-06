-- CreateTable
CREATE TABLE "Videojuego" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "url_imagen" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Videojuego_pkey" PRIMARY KEY ("id")
);
