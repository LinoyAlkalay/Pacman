'use strict'

// const GHOST = '&#9781'
const GHOST = '⍝'
// const GHOST = '<img src="img/ghost.png" alt="pacman">'
var gGhosts = []
var gRemoveGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    clearInterval(gIntervalGhosts)
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor() // in class
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function removeGhost(location) { //move to ghost file
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            gRemoveGhosts.push(ghost)
            gGhosts.splice(i, 1)
            // setTimeout(() => {
            //     createGhost(gBoard)
            // }, 5000)
        }
    }
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function reviveGhost() { // in class
    for(var i = 0; i < gRemoveGhosts.length; i++) {
        const ghost = gRemoveGhosts[i]
        gGhosts.push(ghost)
    }
    gRemoveGhosts = []
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === POWER_FOOD) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))

    // const elGhost = document.querySelectorAll('.ghost')
    // for(var i = 0; i < elGhost.length; i++) {
    //     elGhost[i].style.color = getRandomColor()
    // }
}

function getMoveDiff() {
    const randNum = getRandomInt(1, 4)
    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

// DONE: Ghosts should have a random color
function getGhostHTML(ghost) {
    // return `<span class="ghost" style="color:${getRandomColor()};">${GHOST}</span>`
    
    // in class
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span class="ghost" style="color:${color};">${GHOST}</span>`
}