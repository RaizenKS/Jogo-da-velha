class TicTacToe{
    constructor(){
        this.turnPlayer = 1;
        this.boxRow = document.querySelectorAll('.row');
        this.overlay = document.querySelector('#overlay');
        this.menu = document.querySelector("#menu");
        this.message = document.querySelector('#menu h2');
        this.btnRestart = document.querySelector('#menu button');
        this.winPlays = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [2,4,6], [0,4,8]
        ]
    }

    checkWin() {
        for (let i = 0; i < this.winPlays.length; i++) {
            const row = this.winPlays[i]; 
            const elements = row.map(index => this.boxRow[index]);
            if(Array.from(elements).every(row => row.textContent == 'X')){
                this.overlay.style.display = 'flex';
                this.menu.style.display = 'flex';
                this.message.textContent = 'O Player 1 venceu';
                return
            }else if(Array.from(elements).every(row => row.textContent == 'O')){
                this.overlay.style.display = 'flex';
                this.menu.style.display = 'flex';
                this.message.textContent = 'O Player 2 venceu';
                return
            }
        }
        if(Array.from(this.boxRow).every(row => row.textContent !== '')){
            this.overlay.style.display = 'flex';
            this.menu.style.display = 'flex';
            this.message.textContent = 'Empate';
            return  
        }
    }

    play(event){
        if(event.target.textContent == ''){
            if(this.turnPlayer == 1){
                event.target.classList.add('x')
                event.target.textContent = 'X';
                this.checkWin();
                this.turnPlayer = 2;
            }else{
                event.target.classList.add('o')
                event.target.textContent = 'O';
                this.checkWin();
                this.turnPlayer = 1;
            }
        }
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
    }
}

const game = new TicTacToe

for(let i = 0; i<game.boxRow.length; i++){
    game.boxRow[i].addEventListener('click', game.play.bind(game));
}

game.btnRestart.addEventListener('click', game.restart.bind(game))







