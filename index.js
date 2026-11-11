import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient }  from "./prisma/generated/prisma/index.js"
import "dotenv/config"



const PORT = 3000

const app = express()

// Configuracion del middleware
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(bodyParser.json())
app.use(cors())

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// Endpoints
app.post("/login", async function(req, resp) {
    const data = req.body
    const usuario = data.usuario
    const password = data.password

    const usuarioLogueado = await prisma.usuario.findFirst({
        where : {
            username : usuario,
            password : password
        }
    })

    if (usuarioLogueado == null) {
        // Error login
        resp.json({
            msg : "Error en el login"
        })
        return
    }else {
        resp.json({
            msg : ""
        })
        return
    }
})

// ================== Plataformas ==========================//
app.get("/plataformas", async function(req, resp) {
    const plataformas = await prisma.plataforma.findMany()
    resp.json(plataformas)
})

app.post("/plataformas", async function(req, resp) {
    const plataforma = req.body

    await prisma.plataforma.create({
        data : plataforma
    })

    resp.json({
        msg : ""
    })
})

// ================== Categorias ==========================//
app.get("/categorias", async function(req, resp) {
    const categorias = await prisma.categoria.findMany({
        include : {
            videojuegos : {
                omit : {
                    url_imagen : true,
                    sinopsis : true,
                    idCategoria : true
                }
            }
        }
    })
    resp.json(categorias)
})

app.post("/categorias", async function(req, resp) {
    const categoria = req.body

    await prisma.categoria.create({
        data : categoria
    })

    resp.json({
        msg : ""
    })
})

// ============= Videojuegos ==============================//

app.get("/videojuegos/:id", async function(req, resp) {
    const id = req.params.id

    const videojuego = await prisma.videojuego.findFirst({
        where : {
            id : Number(id)
        },
        include : {
            categoria : {
                omit : {
                    descripcion : true
                }
            },
            plataformas : true
        },
        omit: {
            idCategoria : true
        }
    })
    if (videojuego == null) {
        resp.json({
            msg : "No existe videojuego con el id enviado"
        })
        return
    }else {
        resp.json({
            videojuego : videojuego,
            msg : ""
        })
        return
    }
})

app.get("/videojuegos", async function(req, resp) {
    const categoriaId = req.query.categoria_id

    const videojuegos = await prisma.videojuego.findMany({
        where :  categoriaId == undefined ? undefined : {
            idCategoria : Number(categoriaId)
        },
        include : {
            categoria : true,
            plataformas : true
        },
        omit : {
            idCategoria : true
        }
        
    })
    resp.json(videojuegos)
})

app.post("/videojuegos", async function(req, resp) {
    const vj = req.body
    // TODO :Validar formato de vj
    await prisma.videojuego.create({
        data : {
            ...vj,
            plataformas : {
                connect : vj.plataformas
            }
        }
    })
    resp.json({
        msg : ""
    })
})


app.listen(PORT, function() {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})
