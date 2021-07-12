const mongoose = require("./mongo")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    project:{
        type: String
    },
    project_descib:{
        type: String
    },
    Created_At: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const user = mongoose.model("Users", UserSchema) 
module.exports = user