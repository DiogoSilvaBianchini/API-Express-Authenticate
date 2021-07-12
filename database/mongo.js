const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/login", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Banco de dados conectado")
}).catch(err => {
    console.log("Coneção do banco de dados não efetuada. Error =" + err)
})

module.exports = mongoose