class Game {
    constructor(board, mainShapeStr) {
        this.board = board
        setupPlayers(mainShapeStr)
    }

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

    gameState = "off"

    setupPlayers(firstShape) {
        if (firstShape === "x") {
            players[0].shape = "x"
            players[1].shape = "circle"
        } else {
            players[0].shape = "circle"
            players[1].shape = "x"
        }
    }

    getCurrentPlayer() {
        return players.filter(player => player.activeTurn)
    }

    getNextPlayer(current) {
        if (current.shape = "x") return "circle"
        if (current.shape = "circle") return "x"
    }

    findPlayer(id) {
        return players.find(player => player.id === id)
    }

    nextTurn() {
        const cur = this.getCurrentPlayer()
        const next = this.getNextPlayer(cur.id)

        this.findPlayer(cur.id).activeTurn = false
        this.findPlayer(next.id).activeTurn = true
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
        ctx.moveTo(2 * this.board.wwidth / 3, 0)
        ctx.lineTo(2 * this.board.width / 3, this.board.height)
        ctx.stroke()
    }

    drawShape(horPos, vertPos) {
        ctx = this.board.getContext("2d")

        ctx.strokeStyle = "indigo"
        ctx.lineWidth = 5

        ctx.moveTo(horPos, vertPos)
        ctx.beginPath()
        ctx.arc(horPos, vertPos, this.board.width / 3, 0, Math.PI * 2)
        ctx.stroke()
    }

    startRandomTurn() {
        const randomFloat = Math.random()

        if (randomFloat <= 0.5) {
            players[0].activeTurn = true
            players[1].activeTurn = false
        } else {
            players[0].activeTurn = false
            players[1].activeTurn = true
        }
    }

    clearData() {
        startRandomTurn()
        players.forEach(player => player.results = new Set())
    }

    handleBoardClick() {
        this.board.addEventListener("click", (event) => {
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

    game.drawCanvas()
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
