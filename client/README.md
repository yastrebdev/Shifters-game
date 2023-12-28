# Описание методов и порядок создания программы

## Создание поля

1. Файл `script.js` - точка входа.  
   Получаем `game-board` с помощью:

```js
const gameBoard = document.getElementById("game-board");
```

2. Создаём файл `grid.js`. Внутри создаём **class Grid** и экспортируем его:

```js
export class Grid {
  constructor(gridElement) {}
}
```

В конструкторе будем получать наш `gridElement`

3. Создаём файл `cell.js`. Внутри создаём **class Cell** и экспортируем его:

```js
export class Cell {
  constructor(gridElement, x, y, rundomNum) {}
}
```

В конструкторе получаем `gridElement`, `x, y` для определения координат ячейки  
и rundomNum для определения скрытого числа

4. Далее в `script.js` импортируем **Grid**, создаём новый клвсс,  
   передаём в аргументах `gridElement` и присваиваем всё переменной `grid`:

```js
import { Grid } from "./grid.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
```

5. В `grid.js` импортируем **Cell**, определяем количество ячеек,  
   создаём массив `cells`, с помощью цикла создаём количество ячеек  
   `new Cell` равное значению переменной `CELLS_COUNT` и каждую ячейку  
   пушим в массив `cells`:

```js
import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(gridElement) {
    this.cells = [];
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }
  }
}
```

> **Промежуточный итог:** мы создали пустое поле в сетку 4х4
