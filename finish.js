import { statistics } from "./statistics.js";
import { stopTimer } from "./timer.js";

export class Finish {
    constructor(panel) {
        const timerElement = document.getElementById('timer');
        const endTime = document.getElementById('end-time')

        const actions = document.getElementById('actions')

        this.endTime = endTime
        this.timerElement = timerElement

        this.actions = actions

        const buttons = document.getElementById('finish-buttons');
        const newGameButton = document.createElement('button');
        newGameButton.textContent = 'Стартовое меню';
        newGameButton.addEventListener('click', () => {
            this.newGame()
        })
        buttons.append(newGameButton)
        this.panel = panel
    }

    winGame() {
        this.endTime.textContent = this.timerElement.textContent
        this.actions.textContent = statistics.getActions()
        this.panel.style.transform = 'scale(1)'
        stopTimer()
    }

    newGame() {
        this.panel.style.transform = 'scale(0)'
        setTimeout(() => {location.reload()}, 400)
    }
}