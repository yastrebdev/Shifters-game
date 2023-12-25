import { settings } from "./startrSettings.js";
import { statistics } from "./statistics.js";
import { stopTimer } from "./timer.js";

export class Finish {
    constructor(panel) {
        const timerElement = document.getElementById('timer');
        const endTime = document.getElementById('end-time')

        const actionsResult = document.getElementById('actions-result')

        const title = document.getElementById('finish-title')

        this.endTime = endTime
        this.timerElement = timerElement

        this.actions = actionsResult

        this.title = title

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
        this.title.textContent = "Вы победили"
        this.endTime.textContent = this.timerElement.textContent
        this.actions.textContent = settings.getMode() === "Свободный" ? statistics.getActions() : statistics.getNumberOfActions() - statistics.getActions()
        this.panel.style.transform = 'scale(1)'
        stopTimer()
    }

    gameOver() {
        this.title.textContent = "Вы проиграли"
        this.endTime.textContent = this.timerElement.textContent
        this.actions.textContent = statistics.getNumberOfActions()
        this.panel.style.transform = 'scale(1)'
        stopTimer()
    }

    newGame() {
        this.panel.style.transform = 'scale(0)'
        setTimeout(() => {location.reload()}, 400)
    }
}