'use strict'

// const PACMAN = '🤓'
const PACMAN = '<div class="pacman"><img src="img/Pacman.png" alt="pacman"></div>'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(nextLocation)
        } else return gameOver()
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === POWER_FOOD && gPacman.isSuper) return
    else if (nextCell === POWER_FOOD) {
        gPacman.isSuper = true
        setTimeout(() => {
            // const elGhost = document.querySelectorAll('.ghost')
            // for (var i = 0; i < elGhost.length; i++) {
            //     elGhost[i].style.color = 'blue' // rendercell
            // }
            gPacman.isSuper = false
            reviveGhost()
        }, 5000)

    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

    if (isFoodDone(gBoard)) gameDone(isFoodDone)
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    const elImgPacman = document.querySelector('.pacman')
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            elImgPacman.classList.add('flip-vertically')
            nextLocation.i--
            // elImg.style.transform = 'scaleX(-1)'
            break
        case 'ArrowRight':
            elImgPacman.classList.add('flip-horizontally')
            nextLocation.j++
            break
        case 'ArrowDown':
            elImgPacman.classList.add('flip-vertically')
            nextLocation.i++
            break
        case 'ArrowLeft':
            elImgPacman.classList.add('flip-horizontally')
            nextLocation.j--
            break
    }
    return nextLocation
}

function isFoodDone(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) return false
        }
    }
    return true
}