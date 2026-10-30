import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const PORT = 3000

const app = express()

// Configuracion del middleware
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(bodyParser.json())
app.use(cors())

// Endpoints
app.post("/login", function(req, resp) {
    const data = req.body
    const usuario = data.usuario
    const password = data.password

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
