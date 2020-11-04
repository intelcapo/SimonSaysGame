const btnPlay = document.getElementById("btnPlay");
const blue = document.getElementById("blue");
const purple = document.getElementById("purple");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

var newGame;

btnPlay.addEventListener("click", function () {
    newGame = new Game();
});

class Game {
    constructor() {
       
        this.LVL_DIFFICULTY = 10;
        this.secuence = [];
        this.lvl = 1;
        this.subLvl = 0;
        this.colors = {
            blue,
            purple,
            yellow,
            green
        }
        this.GenerateSecuence();
        this.Start();

    }

    GenerateSecuence() {
        console.warn("[Init secuence]");
        this.secuence = new Array(this.LVL_DIFFICULTY).fill(0).map(n => Math.floor((Math.random() * 4) + 1));
    }

    newGame() {
        btnPlay.classList.remove("hide");       
    }

    Start() {
        btnPlay.classList.add("hide");        
        this.NextLevel = this.NextLevel.bind(this);
        this.PickColor = this.PickColor.bind(this);
        this.NextLevel();
       
    }

    NextLevel() {
        this.subLvl = 0;
        this.HighLightSecuence();
        this.AddClickEvents();
        console.warn(`[next level] : ${this.lvl}`);
        console.log(`[sub lvl] : ${this.subLvl}`);
    }

    HighLightSecuence() {
        for (let i = 0; i < this.lvl; i++) {
            let color = this.ObtainColorByNumber(this.secuence[i]);
            setTimeout(() => this.HighLightColor(color), (1000 * i));
        }
    }

    HighLightColor(color) {
        console.log(color);
        this.colors[color].classList.add("light");
        setTimeout(() => this.ShutDownColor(color), 400);

    }

    ShutDownColor(color) {
        this.colors[color].classList.remove("light");
    }

    ObtainColorByNumber(idColor) {
        switch (idColor) {
            case 1:
                return 'blue';
            case 2:
                return 'purple';
            case 3:
                return "yellow";
            case 4:
                return "green";
        }
    }

    ObtainNumberByColor(color) {
        switch (color) {
            case 'blue':
                return 1;
            case 'purple':
                return 2;
            case "yellow":
                return 3;
            case "green":
                return 4;
        }
    }

    AddClickEvents() {
        this.colors.blue.addEventListener('click', this.PickColor);
        this.colors.purple.addEventListener('click', this.PickColor);
        this.colors.yellow.addEventListener('click', this.PickColor);
        this.colors.green.addEventListener('click', this.PickColor);
    }

    RemoveClickEvents() {
        this.colors.blue.removeEventListener('click', this.PickColor);
        this.colors.purple.removeEventListener('click', this.PickColor);
        this.colors.yellow.removeEventListener('click', this.PickColor);
        this.colors.green.removeEventListener('click', this.PickColor);
    }


    PickColor(eventArgs) {
        const colorPicked = eventArgs.target.dataset.color;
        console.log(colorPicked);
        let idColor = this.ObtainNumberByColor(colorPicked);
        this.HighLightColor(colorPicked);
        
        console.log(`[SubLevel] ${this.subLvl}`);
        console.log(this.secuence);
        console.log(`picked: ${idColor}  | secuence ${ this.secuence[this.subLvl] }`);

        if (idColor === this.secuence[this.subLvl]) {
            this.subLvl++;
            if (this.subLvl === this.lvl) {
                this.lvl++;
                this.RemoveClickEvents();

                if (this.lvl === (this.LVL_DIFFICULTY + 1)) {
                    this.Win();
                }
                else {                   
                    setTimeout(this.NextLevel, 1500);
                } 
            }
           
        } else {
            this.Lose();
        }
    }

    Win() {
        alert("you win")
        this.Start();

    }

    Lose() {
        alert("You lose :(");
        this.newGame();
        this.RemoveClickEvents();
    }



}


