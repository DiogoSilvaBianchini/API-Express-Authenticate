const express = require("express")
const app = express()
app.set("view engine", "pug")

const session = require("express-session")
const flash = require("connect-flash")
app.use(session({
    secret: "hashzimbrabo",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use((req,res,next) => {
    res.locals.succes_msg = req.flash("Sucesso")
    res.locals.error_msg = req.flash("Error")

    next()
})
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const router = require("./router/index")
app.use("/", router)
app.use("/user", router)

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free"))
const port = process.env.PORT || 8082
app.listen(port, () => {
    console.log(`localhost:${port}`)
})