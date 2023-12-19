export class Finish {
    constructor(panel) {
        const buttons = document.getElementById('finish-buttons');
        const newGameButton = document.createElement('button');
        newGameButton.textContent = 'Новая игра с теми же параметрами';
        newGameButton.addEventListener('click', () => {
            this.newGame()
        })
        buttons.append(newGameButton)
        this.panel = panel
    }

    winGame() {
        this.panel.style.transform = 'scale(1)'
    }

    newGame() {
        this.panel.style.transform = 'scale(0)'
        setTimeout(() => {location.reload()}, 400)
    }
}