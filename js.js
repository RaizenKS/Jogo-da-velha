class TicTacToe{
    constructor(){
        this.menuPlayer = document.querySelector("#menu-player");
        this.buttonsMenuPlayer = document.querySelectorAll("#menu-player button");
        this.boxTicTacToe = document.querySelector("#ticTacToe");
        this.boxRow = document.querySelectorAll('.row');
        this.overlay = document.querySelector('#overlay');
        this.menu = document.querySelector("#menu");
        this.message = document.querySelector('#menu h2');
        this.btnRestart = document.querySelector('#menu button');
        this.robot = false;
        this.turnPlayer = 1;
        this.boxWin = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [2,4,6], [0,4,8]
        ]
    }

    chooseEnemy(event){
        this.menuPlayer.style.display = 'none';
        this.boxTicTacToe.style.display = 'block';

        if(event.target.id == 'btn-2player'){this.robot == false};
        if(event.target.id == 'btn-1player-robot'){this.robot = true};
    }
    
    play(event){
        if(event.target.textContent === ''){
            if(this.turnPlayer == 1){
                event.target.classList.add('x')
                event.target.textContent = 'X';
                this.turnPlayer = 2;
                this.checkWin();
                if(this.turnPlayer == 2 && this.robot){
                    this.makeRobotMove();
                }
            }else if(this.turnPlayer == 2 && !this.robot){
                event.target.classList.add('o')
                event.target.textContent = 'O';
                this.turnPlayer = 1;
                this.checkWin();
            }
        }  
    }


    checkWin(){
        for (let i = 0; i < this.boxWin.length; i++){
            const win = this.boxWin[i]; 
            const elements = win.map(index => this.boxRow[index]);
            if(elements.every(element => element.textContent == 'X')){
                this.menu.style.display = 'flex';
                this.overlay.style.display = 'flex';
                this.message.textContent = 'Player 1 venceu'
                return
            }else if(elements.every(element => element.textContent == 'O')){
                this.menu.style.display = 'flex';
                this.overlay.style.display = 'flex';
                this.message.textContent = 'Player 2 venceu'
                return
            }else if(Array.from(this.boxRow).every(box => box.textContent !== '')){
                this.menu.style.display = 'flex';
                this.overlay.style.display = 'flex';
                this.message.textContent = 'Empate'
                return
            }
        }
    }

    makeRobotMove(){
        let array = Array.from(this.boxRow).filter(row => row.textContent == '')
        if(array.length > 0){
            let random = parseInt(Math.random()*array.length)
            array[random].classList.add('o');
            array[random].textContent = 'O';
        }
        this.turnPlayer = 1;
        this.checkWin();   
    }

    restart(){
        this.turnPlayer = 1;
        this.boxRow.forEach((row) => {
            row.textContent = '';
            row.classList.remove('x');
            row.classList.remove('o');
        })
        this.overlay.style.display = 'none';
        this.menu.style.display = 'none';
        this.boxTicTacToe.style.display = 'none';
        this.menuPlayer.style.display = 'flex';
        this.robot = false;
    }
}


// Instancia do jogo
const game = new TicTacToe

game.buttonsMenuPlayer.forEach((btn)=>{
    btn.addEventListener('click', game.chooseEnemy.bind(game))
})

for(let i = 0; i<game.boxRow.length; i++){
    game.boxRow[i].addEventListener('click', game.play.bind(game));
}

game.btnRestart.addEventListener('click', game.restart.bind(game));







