class Game {
    constructor(board, userShape, otherShape) {
        this.board = board
        this.userShape = userShape
        this.otherShape = otherShape

        this.clear()
    }

    activeTurn = 'user1'
    rows = [
        [1,2,3],
        [4,5,6,],
        [7,8,9]
    ]
    columns = [
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ]
    diagonals = [
        [1,5,9],
        [3,5,7]
    ]

    wins = [this.rows, this.columns, this.diagonals]
    user1_results = []
    user2_results = []
    
    createSquares() {
        for (let i = 0; i < 9; i++) {
            let square = document.createElement("div")

            square.classList.add('border')
            square.classList.add('col-4')
            square.classList.add('square')
            square.id = 'square' + (i + 1)
            
            this.board.appendChild(square)
        }
    }

    drawShape(square) {
        if (this.activeTurn == 'user1') {
            square.innerHTML = this.userShape.innerHTML
        }

        if (this.activeTurn == 'user2') {
            square.innerHTML = this.otherShape.innerHTML
        }
    }

    handleSquareClick() {
        let squares = document.querySelectorAll('.square')
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (square.innerHTML == '') {
                    this.drawShape(square)  
                    this.markResult(square.id.split('square')[1])
                } 
                this.checkWinner()
                this.changeTurn()
            })
        })
    }

    changeTurn() {
        this.activeTurn == 'user1' ? this.activeTurn = 'user2' : this.activeTurn = 'user1'
    }

    markResult(id) {
        if (this.activeTurn == 'user1') {
            this.user1_results.push(id)
        }
        if (this.activeTurn == 'user2') {
            this.user2_results.push(id)
        }

        this.sortResults()
    }

    sortResults() {
        this.user1_results.sort()
        this.user2_results.sort()
    }

    checkWinner() {
        const results = this.activeTurn == 'user1' ? this.user1_results : this.user2_results

        for (let i = 0; i < this.wins.length; i++) {
            for (let j = 0; j < this.wins[i].length; j++) {
              const win = this.wins[i][j];
              console.log(this.arrayContainsSubArray(this.user1_results, win))
              if (this.arrayContainsSubArray(results, win)) {
                console.log(`${results} wins!`);
                return;
              }
            }
          }

        // check for a tie
        if (this.user1_results.length + this.user2_results.length === 9) {
            console.log('It\'s a tie!');
            return;
        }
    }

    arrayContainsSubArray(arr, target) {
        return target.every(v => arr.includes(v))
    }

    clear() {
        this.activeTurn = 'user1'
        this.user1_results = []
        this.user2_results = []
    }
}

const board = document.getElementById('board')
const X = document.getElementById('x')
const CIRCLE = document.getElementById('circle')

let gameLoaded = false;

X.addEventListener('click', () => {
    if (gameLoaded == false) {
        loadGame(X, CIRCLE)
    } else {
        this.clear()
    }
})

CIRCLE.addEventListener('click', () => {
    if (gameLoaded == false) {
        loadGame(CIRCLE, X)
    } else {
        this.clear()
    }
})

function loadGame(userShape, otherShape) {
    let game = new Game(board, userShape, otherShape)

    gameLoaded = true;

    game.createSquares()
    game.handleSquareClick()
}

function clear() {
    let squares = document.querySelectorAll('.square')
    squares.forEach(square => {
        square.innerHTML = ''
    })
}