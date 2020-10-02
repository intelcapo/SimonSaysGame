const btnPlay = document.getElementById("btnPlay");
var newGame;

btnPlay.addEventListener("click",function(){
    newGame = new Game();
    newGame.Start();
    console.log(newGame.secuence);
 });

class Game{
    constructor(){
        this.LVL_DIFFICULTY = 10;
        this.secuence = [];
        this.lvl = 1;
        this.GenerateSecuence();
    }

    GenerateSecuence(){       
        this.secuence = new Array(this.LVL_DIFFICULTY).fill(0).map( n => Math.floor((Math.random() * 4 ) + 1));        
    }

    Start(){
        console.log("Help");
        btnPlay.classList.add("hide");
    }

    
}


