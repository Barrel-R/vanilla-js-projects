class Game {
    constructor(board, userShape, otherShape) {
        this.board = board
        this.userShape = userShape
        this.otherShape = otherShape
    }

    game_state = 'off'
    active_turn = 'user1'

    board_matrix = [
        [1,2,3],
        [4,5,6,],
        [7,8,9]
    ]

    columns = []
    diagonal = []
    counter_diagonal = []

    user1_results = []
    user2_results = []
    
    drawCanvas() {
        const canvas = document.getElementById("board")
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate center position
        const canvasCenterX = (viewportWidth - canvas.width) / 2;
        const canvasCenterY = (viewportHeight - canvas.height) / 2;

        // Center the canvas
        canvas.style.position = "absolute";
        canvas.style.left = canvasCenterX + "px"
        canvas.style.top = canvasCenterY + "px"

        const ctx = canvas.getContext('2d')

        ctx.strokeStyle = "black"
        ctx.lineWidth = 5

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 3);
        ctx.lineTo(canvas.width, canvas.height / 3);
        ctx.moveTo(0, 2 * canvas.height / 3);
        ctx.lineTo(canvas.width, 2 * canvas.height / 3);
        ctx.stroke();
        
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(canvas.width / 3, 0);
        ctx.lineTo(canvas.width / 3, canvas.height);
        ctx.moveTo(2 * canvas.width / 3, 0);
        ctx.lineTo(2 * canvas.width / 3, canvas.height);
        ctx.stroke();
    }

    handleBoardClick() {
        let board = document.getElementById('board')
        board.addEventListener("click", (event) => {
            console.log(event.offsetX / board.width, event.offsetY / (board.height + 10))
        })
    }

    changeTurn() {
        this.active_turn === 'user1' ? this.active_turn = 'user2' : this.active_turn = 'user1'
    }

    markResult(id) {
        if (this.active_turn === 'user1') {
            this.user1_results.push(parseInt(id))
            console.log(this.user1_results)
        }
        if (this.active_turn === 'user2') {
            this.user2_results.push(parseInt(id))
            console.log(this.user2_results)
        }
    }

    checkWinner() {
        const result = this.active_turn === 'user1' ? this.user1_results : this.user2_results

        this.checkRows(result)
        this.checkColumns(this.columns, result)
        this.checkDiagonal(this.diagonal, result)
        this.checkDiagonal(this.counter_diagonal, result)
        this.checkForTie()
    }

    checkRows(result) {
        for (let i = 0; i < this.board_matrix.length; i++) {
            if (this.board_matrix[i].every(num => result.includes(num))) {
                this.finishGame()
            }
        }
    }

    checkColumns(columns, result) {
        columns.forEach(column => {
            if (column.every(num => result.includes(num))) {
                this.finishGame()
            }
        })
    }
    
    checkDiagonal(diagonal, result) {
        if (diagonal.every(num => result.includes(num))) {
            this.finishGame()
        }
    }

    checkForTie() {
        const MAX_INPUT_NUMBER = 9
        if (this.user1_results.length + this.user2_results.length === MAX_INPUT_NUMBER) {
            this.finishGame(true)
        }
    }

    getColumns() {
        const columns = []

        for (let i = 0; i < this.board_matrix[0].length; i++) {
            const column = []
            for (let j = 0; j < this.board_matrix.length; j++) {
                column.push(this.board_matrix[j][i])
            }
            columns.push(column)
        }
        return columns
    }

    clearData() {
        this.active_turn = 'user1'
        this.user1_results = []
        this.user2_results = []
        
        console.log('clearing')
    }

    finishGame(tie = null) {
        if (tie !== null) {
            console.log('It\'s a tie!')
        } else {
            console.log(`${this.active_turn} wins!`)
        }
        this.game_state = 'ended'
        this.clearData()
        return
    }

    proccessLoad() {
        console.log('loading')
        this.clearData()
        this.game_state = 'loaded'
    }

    setBoardData() {
        for (let i = 0; i < this.board_matrix.length; i++) {
            for (let j = 0; j < this.board_matrix[i].length; j++) { 
                if (i === j) {
                    this.diagonal.push(this.board_matrix[i][j])
                }
                if (i + j === this.board_matrix.length - 1) {
                    this.counter_diagonal.push(this.board_matrix[i][j])
                }
            }
        }
        this.columns = this.getColumns()
    }
}

const board = document.getElementById('board')
const X = document.getElementById('x')
const CIRCLE = document.getElementById('circle')

let game_loaded = false;

X.addEventListener('click', function setXGame() {
    const game = gameInstance(X, CIRCLE)
    if (game_loaded === false) {
        startGame(game)
    }
    game.proccessLoad()
})

CIRCLE.addEventListener('click', function setCircle() {
    const game = gameInstance(CIRCLE, X)
    if (game_loaded === false) {
        startGame(game)
    }
    game.proccessLoad()
})

var gameInstance = function(userShape, otherShape) {
    let game = new Game(board, userShape, otherShape)

    fadeButtons()
    dissmissTitle()
    return game
}

function startGame(game_instance) {
    game_loaded = true;
    game_instance.drawCanvas()
    game_instance.handleBoardClick()
    game_instance.setBoardData()
}

function dissmissTitle() {
    const title = document.querySelector("[data-title]")
    title.classList.add('visually-hidden')
}

function fadeButtons() {
    const buttons = [X, CIRCLE]
    buttons.forEach(button => {
        button.classList.add('fade-animation')
        button.addEventListener('animationend', endAnimation)
        
        function endAnimation() {
            button.classList.add('visually-hidden')
            button.classList.remove('fade-animation')
            button.removeEventListener('animationend', endAnimation)
        }
    })
}