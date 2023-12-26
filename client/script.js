import { Start } from "./start.js";
import { Grid } from "./grid.js";
import { Finish } from "./finish.js";
import { statistics } from "./statistics.js";
import { settings } from "./startrSettings.js";

const startBlock = document.getElementById('start-block')
const gameBoard = document.getElementById('game-board');
const finishBlock = document.getElementById('finish-block')

const grid = new Grid(gameBoard)
const start = new Start(startBlock, grid)
const finish = new Finish(finishBlock)
start.logMovies()
setupClickOnce()
grid.chengeSize()

function setupClickOnce() {
    window.addEventListener('click', handleClick, {once: true})
}

let pairs = []
let value = ''

function handleClick(event) {
    const valueCell = event.target.getAttribute('value')
    const targetCell = grid.cells.find(cell => cell.value === valueCell)
    if (!targetCell || pairs.length === 2) {
        setupClickOnce()
        return
    }

    targetCell?.tileReversal()
    createPairs(targetCell)

    const openCells = grid.cells.filter(cell => cell.tile.open === true)
    
    const matchPairs = searchNumberPairs()

    if (matchPairs === false) {
        setTimeout(() => {
            pairs = []
            openCells.forEach(cell => {
                cell.tileClose()
            })
        }, 1000)
    }

    if (matchPairs) {
        setTimeout(() => {
            pairs = []
            openCells.forEach(cell => cell.removeTile())
            settings.downCount()
            if (settings.getCount() === 0) {
                finish.winGame()
            }
        }, 1000)
    }
    
    if (statistics.getMode() !== 'free' && statistics.getActions() === 0) {
        finish.gameOver()
    }
    
    setupClickOnce()
    
    console.log('Массив пар:', pairs[0], pairs[1])
}

function createPairs(cell) {
    if (value === cell.value) return
    if (pairs.length === 2) return
    pairs.push(cell?.getTileContent(pairs))
    value = cell.value
}

function searchNumberPairs() {
    if (pairs.length < 2) return
    const match = pairs[0] === pairs[1]
    return match
}