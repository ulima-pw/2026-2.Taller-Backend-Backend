import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient }  from "../generated/prisma/index.js"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    
    await prisma.categoria.create({
        data : {
            nombre : "Acción",
            descripcion : "Accion"
        }
    })

    await prisma.categoria.create({
        data : {
            nombre : "Aventura",
            descripcion : "Aventura"
        }
    })

    await prisma.categoria.create({
        data : {
            nombre : "Deportes",
            descripcion : "Deportes"
        }
    })

    await prisma.plataforma.create({
        data : {
            nombre :"PS5"
        }
    })
    await prisma.plataforma.create({
        data : {
            nombre :"Switch 2"
        }
    })

    await prisma.plataforma.create({
        data : {
            nombre :"PC"
        }
    })

    await prisma.usuario.create({
        data : {
            nombre : "Admin",
            username : "admin@ulima.edu.pe",
            password : "123"
        }
    })

    const categoria_accion = await prisma.categoria.findFirst({
        where : {
            nombre : "Acción" 
        }
    })

    if (categoria_accion != null) {
        await prisma.videojuego.create({
            data : {
                nombre : "GTA 6",
                url_imagen : "xyz",
                sinopsis : "Este es un juego que se va a lanzar",
                idCategoria : categoria_accion.id
            }
        })
    }
}

main().finally(() =>prisma.$disconnect());