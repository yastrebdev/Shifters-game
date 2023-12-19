import { settings } from "./startrSettings.js";
import { startTimer } from "./timer.js";

export class Start {
    constructor(panel, grid) {
        const startGameButton = document.getElementById('start-game-button');
        startGameButton.addEventListener('click', () => {
            this.newGame()
        })

        const tabs = document.querySelectorAll('.tab-size')

        tabs.forEach(tab => {
            tab.addEventListener('click', (event) => {
                tabs.forEach(t => t.classList.remove('tab-size__active'));

                tab.classList.add('tab-size__active');

                this.getSize(event);
                grid.chengeSize()
            });
        });

        const tabWithSize4 = document.querySelector('[data-size="4"]');
        if (tabWithSize4) {
            tabWithSize4.classList.add('tab-size__active');
            settings.setSize(4)
        }
        
        this.panel = panel
    }

    newGame() {
        this.panel.style.transform = 'scale(0)'
        startTimer()
    }

    getSize(event) {
        settings.setSize(event ? Number(event.target.dataset.size) : 4)
    }
}