import { Cell } from "./cell.js";
import { settings } from "./startrSettings.js";

export class Grid {
    constructor(gridElement) {
        this.gridElement = gridElement
        this.cells = [];
        this.numPairs = [];
    }
    
    shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    chengeSize() {
        this.clearCells()

        this.size = settings.getSize();
        this.gridElement.style.setProperty('--column', this.size)
        this.gridElement.style.setProperty('--row', this.size)

        let grid_size = this.size;
        const CELLS_COUNT = grid_size * grid_size;

        while (this.numPairs.length < CELLS_COUNT) {
            const randomNumber = Math.floor(Math.random() * (Math.random() * 100)) + 1;
            
            if (this.numPairs.indexOf(randomNumber) === -1) {
                this.numPairs.push(randomNumber);
                this.numPairs.push(randomNumber);
            }
        }

        this.randomPositionNums = this.shuffleArray(this.numPairs)

        for (let i = 0; i < CELLS_COUNT; i++) {
            this.cells.push(
                new Cell(this.gridElement, i % grid_size, Math.floor(i / grid_size), 
                    this.randomPositionNums[i]
                )
            );
        }
    }

    clearCells() {
        this.cells.forEach(cell => cell.removeCell());
        this.cells = [];
    }
}
