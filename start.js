import { settings } from "./startrSettings.js";
import { statistics } from "./statistics.js";
import { startTimer } from "./timer.js";

export class Start {
    constructor(panel, grid) {
        const startGameButton = document.getElementById('start-game-button');
        startGameButton.addEventListener('click', () => {
            this.newGame()
        })

        const tabsSize = document.querySelectorAll('.tab-size')
        const tabsMode = document.querySelectorAll('.tab-mode')

        tabsSize.forEach(tab => {
            tab.addEventListener('click', (event) => {
                tabsSize.forEach(t => t.classList.remove('tab-size__active'));

                tab.classList.add('tab-size__active');

                this.getSize(event);
                grid.chengeSize()
            });
        });

        tabsMode.forEach(tab => {
            tab.addEventListener('click', (event) => {
                tabsMode.forEach(t => t.classList.remove('tab-mode__active'));

                tab.classList.add('tab-mode__active');

                this.getMode(event);
                grid.changeMode(event)
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

    getMode(event) {
        settings.setMode(event ? event.target.dataset.mode : 'free')
    }
}