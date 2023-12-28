import { statistics } from "./statistics.js";
import { Tile } from "./tile.js";

export class Cell {
  constructor(gridElement, x, y, rundomNum, actions) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("value", `${x}${y}`);
    gridElement.append(cell);

    this.actions = actions

    this.cell = cell
    this.x = x;
    this.y = y;
    this.value = `${x}${y}`;

    this.tile = new Tile(cell);
    this.tile.tileFilling.textContent = rundomNum
  }

  tileReversal() {
    if (this.tile.empty) return
    if (statistics.getMode() === 'free') {
      statistics.setActions('up')
    } else if (statistics.getMode() === 'normal' || 'hard') {
      statistics.setActions('dawn')
    }
    this.actions.textContent = statistics.getActions()
    this.tile.tileFront.style.transform = "perspective(600px) rotateY(-180deg)";
    this.tile.tileBack.style.transform = "perspective(600px) rotateY(0deg)";
    this.tile.open = true
  }

  tileClose() {
    this.tile.tileFront.style.transform = "perspective(600px) rotateY(0deg)";
    this.tile.tileBack.style.transform = "perspective(600px) rotateY(180deg)";
    this.tile.open = false
  }

  getTileContent() {
    const content = this.tile.tileFilling.textContent;
    return content;
  }

  removeTile() {
    this.tile.tileFront.remove()
    this.tile.tileBack.remove()
    this.cell.style.pointerEvents = 'none'
    this.tile.empty = true
  }

  removeCell() {
    this.removeTile();
    this.cell.remove();
}
}
