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

    async sendResult() {
        const userId = document.cookie.replace('userId').split('=')[1]
        console.log(userId)
        const data = {
            user_id: userId,
            mode: settings.getMode(),
            time: new Date(this.endTime.textContent),
            moves: settings.getMode() === "Свободный" ? statistics.getActions() : statistics.getNumberOfActions() - statistics.getActions()
        }
        try {
            await fetch('http://127.0.0.1:3000/stats', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
                credentials: 'include'
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    winGame() {
        this.title.textContent = "Вы победили"
        this.endTime.textContent = this.timerElement.textContent
        this.actions.textContent = settings.getMode() === "Свободный" ? statistics.getActions() : statistics.getNumberOfActions() - statistics.getActions()
        this.panel.style.transform = 'scale(1)'
        stopTimer()
        this.sendResult()
    }

    gameOver() {
        this.title.textContent = "Вы проиграли"
        this.endTime.textContent = this.timerElement.textContent
        this.actions.textContent = statistics.getNumberOfActions()
        this.panel.style.transform = 'scale(1)'
        stopTimer()
        this.sendResult()
    }

    newGame() {
        this.panel.style.transform = 'scale(0)'
        setTimeout(() => {location.reload()}, 400)
    }
}