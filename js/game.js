'use strict'

const WALL = '🀫'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍔'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gInterval

function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gInterval = setInterval(addCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }

    board[1][1] = board[8][8] = board[1][8] = board[8][1] = POWER_FOOD
    return board
}

function addCherry() {
    var locationEmptyCell = getRandomEmptyCell(gBoard)
    if(!locationEmptyCell) return
    gBoard[locationEmptyCell.i][locationEmptyCell.j] = CHERRY
    renderCell(locationEmptyCell, CHERRY)
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

// DONE: a game-over modal with a play again button should be displayed
function gameOver() {
    clearInterval(gIntervalGhosts)
    clearInterval(gInterval)
    gGhosts = []
    onOpenModal()
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
}

// DONE: When all food is collected - game done – show victorious modal with a play again button
function gameDone(boolean) {
    clearInterval(gIntervalGhosts)
    clearInterval(gInterval)
    onOpenModal(boolean)
    gGhosts = []
    gGame.isOn = false
}

function onOpenModal(boolean) {
    const elModal = document.querySelector('.modal')
    const elH2Modal = elModal.querySelector('h2')
    if (boolean) elH2Modal.innerText = 'Victory!'
    elModal.style.display = 'block'
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    onInit()
}

function getRandomEmptyCell(gBoard) {
    const emptysCells = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD || gBoard[i][j] === EMPTY) {
                emptysCells.push({ i, j })
            }
        }
    }

    var locationEmptyCell = drawNum(emptysCells)
    return locationEmptyCell
}