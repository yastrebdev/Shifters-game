export class Tile {
    constructor(cellElement) {
        const tileFront = document.createElement("div");
        const tileBack = document.createElement("div");
        tileFront.classList.add("tile", "tile__front");
        tileBack.classList.add("tile", "tile__back");
        cellElement.append(tileFront);
        cellElement.append(tileBack);

        const tileFilling = document.createElement("span");
        tileBack.append(tileFilling);

        this.tileFront = tileFront;
        this.tileBack = tileBack;
        this.tileFilling = tileFilling

        this.open = false
        this.empty = false
    }
}
