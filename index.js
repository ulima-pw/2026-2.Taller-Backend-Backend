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

    const usuarios = await prisma.usuario.findMany()


    if (usuario === "oscar" && password === "123") {
        // Login correcto
        /*resp.send(JSON.stringify({
            msg : ""
        }))*/
        resp.json({
            msg : ""
        })
        return
    } else {
        // Login incorrecto
        resp.json({
            msg : "Error en el login"
        })
        return
    }

})

app.listen(PORT, function() {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})
