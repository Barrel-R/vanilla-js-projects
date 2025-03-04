class Game {
    constructor(board, mainShapeStr) {
        this.board = board
        this.setupPlayers(mainShapeStr)
    }

    DRAWING_PADDING = 30
    MAX_INPUT = 9
    gameMessage = ""
    squareSide = board.width / 3

    players = [
        {
            id: "player1",
            activeTurn: false,
            results: new Set(),
            shape: null,
        },
        {
            id: "player2",
            activeTurn: false,
            results: new Set(),
            shape: null,
        },
    ]

    wins = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

    setupPlayers(firstShape) {
        if (firstShape === "x") {
            this.players[0].shape = "x"
            this.players[1].shape = "circle"
        } else {
            this.players[0].shape = "circle"
            this.players[1].shape = "x"
        }
    }

    getCurrentPlayer() {
        return this.players.filter(player => player.activeTurn)[0]
    }

    getNextPlayer(current) {
        return this.players.filter(player => player.id !== current.id)[0]
    }

    getCurrentPlayerResults() {
        return this.getCurrentPlayer().results
    }

    findPlayer(id) {
        return this.players.find(player => player.id === id)
    }

    changeTurn() {
        const cur = this.getCurrentPlayer()
        const next = this.getNextPlayer(cur)

        this.players.find(player => player.id == cur.id).activeTurn = false
        this.players.find(player => player.id == next.id).activeTurn = true
    }

    drawBoard() {
        const viewportWith = window.innerWidth
        const viewportHeight = window.innerHeight

        const boardCenterX = (viewportWith - this.board.width) / 2
        const boardCenterY = (viewportHeight - this.board.height) / 2

        this.board.style.position = "absolute"
        this.board.style.left = boardCenterX + "px"
        this.board.style.top = boardCenterY + "px"

        const ctx = this.board.getContext("2d")

        ctx.strokeStyle = "black"
        ctx.lineWidth = 10

        ctx.beginPath()
        ctx.moveTo(0, this.board.height / 3)
        ctx.lineTo(this.board.width, this.board.height / 3)
        ctx.moveTo(0, 2 * this.board.height / 3)
        ctx.lineTo(this.board.width, 2 * this.board.height / 3)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(this.board.width / 3, 0)
        ctx.lineTo(this.board.width / 3, this.board.height)
        ctx.moveTo(2 * this.board.width / 3, 0)
        ctx.lineTo(2 * this.board.width / 3, this.board.height)
        ctx.stroke()
    }

    drawShape(horPos, vertPos) {
        const currentPlayer = this.getCurrentPlayer()

        const ctx = this.board.getContext("2d")

        ctx.strokeStyle = "indigo"
        ctx.lineWidth = 5

        if (currentPlayer.shape === "circle") {
            ctx.moveTo(horPos, vertPos)
            ctx.beginPath()
            ctx.arc(horPos + this.DRAWING_PADDING, vertPos + this.DRAWING_PADDING, 40, 0, Math.PI * 2)
        } else {
            ctx.beginPath()
            ctx.moveTo(horPos - this.DRAWING_PADDING, vertPos - this.DRAWING_PADDING)
            ctx.lineTo(horPos + this.DRAWING_PADDING, vertPos + this.DRAWING_PADDING)
            ctx.moveTo(horPos + this.DRAWING_PADDING, vertPos - this.DRAWING_PADDING)
            ctx.lineTo(horPos - this.DRAWING_PADDING, vertPos + this.DRAWING_PADDING)
        }

        ctx.stroke()
    }

    startTurn() {
        this.players[0].activeTurn = true
    }

    clearData() {
        this.startTurn()
        this.players.forEach(player => player.results = new Set())
    }

    calculateSquare(x, y) {
        return (y - 1) * 3 + x
    }

    markResult(num) {
        const id = this.getCurrentPlayer().id

        this.findPlayer(id).results.add(num)
    }

    checkWinner() {
        const cur = this.getCurrentPlayer()

        const res = this.wins.filter(win => {
            return win.every(num => cur.results.has(num))
        })

        return res.length > 0
    }

    finishGame() {
        this.clearData()
        console.log(this.gameMessage)
    }

    handleBoardClick() {
        this.board.addEventListener("click", (event) => {
            const xSquare = Math.floor(event.offsetX / this.squareSide)
            const ySquare = Math.floor(event.offsetY / this.squareSide)
            const drawingPositions = {
                "circle": [
                    this.squareSide * xSquare + this.DRAWING_PADDING,
                    this.squareSide * ySquare + this.DRAWING_PADDING
                ],
                "x": [
                    this.squareSide * xSquare + this.squareSide / 2,
                    this.squareSide * ySquare + this.squareSide / 2,
                ]
            }

            const square = this.calculateSquare(xSquare + 1, ySquare + 1)
            const currentPlayer = this.getCurrentPlayer()
            const nextPlayer = this.getNextPlayer(currentPlayer)

            if (currentPlayer.results.has(square) || nextPlayer.results.has(square)) return

            const positions = drawingPositions[currentPlayer.shape]

            this.drawShape(...positions)
            this.markResult(Math.abs(square))

            if (this.checkWinner()) {
                this.gameMessage = currentPlayer.id + " wins!"
                this.finishGame()
                return
            }

            this.changeTurn()

            if (nextPlayer.results.size + currentPlayer.results.size == 9) {
                if (!this.checkWinner()) this.gameMessage = "It's a tie!"
            }
        })
    }

}

const board = document.getElementById("board")
const xButton = document.getElementById("xBtn")
const circleButton = document.getElementById("circleBtn")

let isBoardSetup = false

function startGame(shapeStr) {
    const game = new Game(board, shapeStr)

    fadeButtons()
    dismissTitle()

    game.startTurn()
    game.drawBoard()
    game.handleBoardClick()
    game.clearData()

    isBoardSetup = true
}

xButton.addEventListener("click", () => {
    if (!isBoardSetup) startGame("x")
})

circleButton.addEventListener("click", () => {
    if (!isBoardSetup) startGame("circle")
})

function dismissTitle() {
    const title = document.querySelector(".btn-title")
    title.classList.add("hidden")
}

function fadeButtons() {
    const buttons = [xButton, circleButton]

    buttons.forEach(button => {
        button.classList.add("fade-animation")
        button.addEventListener("animationend", function endAnimation() {
            button.classList.add("hidden")
            button.classList.remove("fade-animation")
            button.removeEventListener("animationend", endAnimation)
        })
    })
}
