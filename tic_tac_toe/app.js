class Game {
    constructor(board, userShape, otherShape) {
        this.board = board
        this.userShape = userShape
        this.otherShape = otherShape
    }

    gameState = 'off'
    activeTurn = 'user1'

    boardMatrix = [
        [1, 2, 3],
        [4, 5, 6,],
        [7, 8, 9]
    ]

    boardDrawPositions = {
        1: [20, 20],
        2: [137, 20],
        3: [254, 20],
        4: [20, 137],
        5: [137, 137],
        6: [254, 137],
        7: [20, 254],
        8: [137, 254],
        9: [254, 254]
    }

    columns = []
    diagonal = []
    counterDiag = []

    firstUserResults = new Set()
    secondUserResults = new Set()

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
        ctx.lineWidth = 10

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

    drawShape(horPos, vertPos, squares) {
        const canvas = document.getElementById("board")
        const ctx = canvas.getContext('2d')

        ctx.strokeStyle = "indigo"
        ctx.lineWidth = 5

        ctx.moveTo(horPos, vertPos);
        ctx.beginPath();
        ctx.arc(horPos + 37, vertPos + 37, 40, 0, Math.PI * 2)
        ctx.stroke();
    }

    handleBoardClick() {
        let board = document.getElementById('board')
        board.addEventListener("click", (event) => this.clickHandler(event))
    }

    clickHandler(event) {
        const horPos = parseInt(event.offsetX / (board.width + 10) * 100)
        const vertPos = parseInt(event.offsetY / (board.height + 10) * 100)
        const squares = this.getSquares(horPos, vertPos)
        const square = this.calculateSquare(squares.horSquare, squares.verSquare)

        const squareXPos = this.boardDrawPositions[square][0]
        const squareYPos = this.boardDrawPositions[square][1]
        console.log(squareXPos, squareYPos)

        if (this.getActiveTurnResults().has(square)) return

        if (!isNaN(square)) {
            //  this.drawShape(horPos, vertPos, squares)
            this.drawShape(squareXPos, squareYPos, squares)
            this.markResult(square)
        }
    }

    getSquares(horPos, vertPos) {
        let horSquare = this.setSquare(horPos)
        let verSquare = this.setSquare(vertPos)

        return { horSquare, verSquare }
    }

    setSquare(pos) {
        let square = undefined

        if (pos < 31) square = 1
        if (pos > 33 && pos < 64) square = 2
        if (pos > 65) square = 3

        return square
    }

    calculateSquare(x, y) {
        return (y - 1) * 3 + x
    }

    getActiveTurnResults() {
        return this.activeTurn === 'user' ? this.firstUserResults : this.secondUserResults
    }


    changeTurn() {
        this.activeTurn === 'user1' ? this.activeTurn = 'user2' : this.activeTurn = 'user1'
    }

    markResult(num) {
        this.getActiveTurnResults().add(num)
    }

    checkWinner() {
        const result = this.activeTurn === 'user1' ? this.firstUserResults : this.secondUserResults

        this.checkRows(result)
        this.checkColumns(this.columns, result)
        this.checkDiagonal(this.diagonal, result)
        this.checkDiagonal(this.counterDiag, result)
        this.checkForTie()
    }

    checkRows(result) {
        for (let i = 0; i < this.boardMatrix.length; i++) {
            if (this.boardMatrix[i].every(num => result.includes(num))) {
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
        if (this.firstUserResults.size + this.secondUserResults.size === MAX_INPUT_NUMBER) {
            this.finishGame(true)
        }
    }

    getColumns() {
        const columns = []

        for (let i = 0; i < this.boardMatrix[0].length; i++) {
            const column = []
            for (let j = 0; j < this.boardMatrix.length; j++) {
                column.push(this.boardMatrix[j][i])
            }
            columns.push(column)
        }
        return columns
    }

    clearData() {
        this.activeTurn = 'user1'
        this.firstUserResults = new Set()
        this.secondUserResults = new Set()

        console.log('clearing')
    }

    finishGame(tie = null) {
        if (tie !== null) {
            console.log('It\'s a tie!')
        } else {
            console.log(`${this.activeTurn} wins!`)
        }
        this.gameState = 'ended'
        this.clearData()
        return
    }

    proccessLoad() {
        console.log('loading')
        this.clearData()
        this.gameState = 'loaded'
    }

    setBoardData() {
        for (let i = 0; i < this.boardMatrix.length; i++) {
            for (let j = 0; j < this.boardMatrix[i].length; j++) {
                if (i === j) {
                    this.diagonal.push(this.boardMatrix[i][j])
                }
                if (i + j === this.boardMatrix.length - 1) {
                    this.counterDiag.push(this.boardMatrix[i][j])
                }
            }
        }
        this.columns = this.getColumns()
    }
}

const board = document.getElementById('board')
const X = document.getElementById('xBtn')
const CIRCLE = document.getElementById('circleBtn')

let game_loaded = false;

X.addEventListener('click', function setXGame() {
    const game = gameInstance(X, CIRCLE)
    if (!game_loaded) {
        startGame(game)
    }
    game.proccessLoad()
})

CIRCLE.addEventListener('click', function setCircle() {
    const game = gameInstance(CIRCLE, X)
    if (!game_loaded) {
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
