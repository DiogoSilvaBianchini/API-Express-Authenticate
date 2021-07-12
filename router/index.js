const express = require("express")
const router = express.Router()
const user = require("../database/User")
const bcrypt = require("bcryptjs")


router.get("/", (req,res) => {
    res.render("home")
})

router.get("/register", (req,res) => {
    res.render("register", {
        error: req.flash("error_msg")
    })
})

router.post("/register", (req, res) => {
    const { name, email, email_confirm, password_confirm, password} = req.body
    try{
        if(email != email_confirm || password != password_confirm){
            req.flash("error_msg", "E-mail e senha não coferem")
            res.redirect("/register")
        }
        if(email != email_confirm || email == "" ){
            req.flash("error_msg", "E-mail não conferem")
            res.redirect("/register")
        }
        if(password != password_confirm || password == ""){
            req.flash("error_msg", "Senhas não conferem")
            res.redirect("/register")
        }
        
        if(email == email_confirm && password == password_confirm){
            new user({
                nome: name,
                email: email,
                password: password
            }).save().then(() => {
                console.log(`Usuario ${name} foi cadastrado com sucesso`)
            }).catch(err => {
                console.log("Cadastro Invalido:" + err)
            })
            res.redirect("/login")
        }
    }catch (err){
        console.log("Algo deu errado" + err.message)
    }
})

router.get("/login", (req,res) => {
    res.render("login", {
        error: req.flash("error_msg")
    })
})

router.post("/login", async (req,res) => {
    const { email, password } = req.body
    try{
        const User = await user.findOne({ email }).select("+password")

        if(!User){
            req.flash("error_msg", "E-mail Incorreto")
            res.redirect("/login")
        }
        if(!await bcrypt.compare(password, User.password)){
            req.flash("error_msg", "Senha incorreta")
            res.redirect("/login")
        }
        
        res.redirect(`/user/${User._id}`)
    }catch (err){
        console.log("Algo deu errado " + err.message)
    }
    
})

router.get("/user/:id", async (req,res) => {
    const User = await user.findOne({_id: req.params.id})
    res.render("user", {
       name: User.nome,
       email: User.email
    })
})

module.exports = router