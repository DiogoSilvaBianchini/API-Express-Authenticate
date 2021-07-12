let menu = document.getElementById("menu")
let aside_menu = document.getElementById("aside_menu")

menu.addEventListener("click", () => {
    if(aside_menu.className == "block_burg block"){
        aside_menu.classList.remove("block")
        aside_menu.classList.add("move_left")
        aside_menu.addEventListener("animationend", () => {
            aside_menu.classList.remove("move_left")
        })
    }else if(aside_menu.className == "block_burg"){
        aside_menu.classList.add("move_left_out")
    }
    aside_menu.addEventListener("animationend", () => {
        if(aside_menu.className == "block_burg move_left_out"){
            aside_menu.classList.add("block")
            aside_menu.classList.remove("move_left_out")
    
        }
    }) 
})


