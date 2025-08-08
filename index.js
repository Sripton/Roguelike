const WIDTH = 40; // ширина карты
const HEIGHT = 24; // высота карты
const TILE_SIZE = 50; // размер изображения
let hasSword = false; // есть ли мечь у врага

let map = []; // 2D массив: "W" = wall, " " = floor
const fieldElement = document.querySelector(".field");

// Инициализация игры
function init() {
  generateMap(); // генерация карты
  generateRandomRooms(); // генерация комнат
  generateRandomCoridors(); // генерация коридоров для прохода
  placeItems();
  renderMap(); // отображение карты
}

// ------------------------------- Этап 1 ------------------------------------
// Сгенерировать карту 40x24
function generateMap() {
  map = []; // Очищаем карту если запуск не первый,  обнуляем глобальную переменную map
  for (let y = 0; y < HEIGHT; y++) {
    const row = []; // В начале каждой строки создаётся пустой массив row, в который  потом запишем все клетки (по горизонтали).
    for (let x = 0; x < WIDTH; x++) {
      row.push("W"); // "W" = wall ( стена)
    }
    map.push(row);
  }
}

// ------------------------------- Этап 2 ------------------------------------
// Залить всю карту стеной
function renderMap() {
  fieldElement.innerHTML = "";
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const tileDiv = document.createElement("div");
      tileDiv.classList.add("tile");
      tileDiv.style.left = `${x * TILE_SIZE}px`;
      tileDiv.style.top = `${y * TILE_SIZE}px`;
      tileDiv.classList.add("tile" + map[y][x]);
      fieldElement.appendChild(tileDiv);
    }
  }
}

// ------------------------------- Этап 3 ------------------------------------
// Разместить случайное количество (5 - 10) прямоугольных “комнат” со случайными размерами (3 - 8 клеток в длину и ширину)
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomRooms() {
  const countRandomRoom = getRandomNum(5, 10);
  // console.log("countRandomRoom", countRandomRoom); // 5
  for (let i = 0; i < countRandomRoom; i++) {
    // i = 0 widthRoom 5; heightRoom 8; x 6; y 8
    const widthRoom = getRandomNum(3, 8); // ширина конматы 5
    const heightRoom = getRandomNum(3, 8); // высота комнаты 8
    const x = getRandomNum(1, WIDTH - widthRoom - 1); // 6
    const y = getRandomNum(1, HEIGHT - heightRoom - 1); //  8
    // console.log(
    //   `widthRoom ${widthRoom}; heightRoom ${heightRoom}; x ${x}; y ${y}`
    // );
    for (let dy = 0; dy < heightRoom; dy++) {
      for (let dx = 0; dx < widthRoom; dx++) {
        map[y + dy][x + dx] = "";
      }
    }
  }
}

// ------------------------------- Этап 4 ------------------------------------
// Разместить случайное количество (3 - 5 по каждому направлению)
// вертикальных и горизонтальных проходов шириной в 1 клетку

function generateRandomCoridors() {
  const rowCount = getRandomNum(3, 5); // горизонтальная линия 3 4 5
  const colCount = getRandomNum(3, 5); // вертикальная линия 3 4 5
  // Горизонтальные проходы rowCount = 4
  for (let i = 0; i < rowCount; i++) {
    const row = getRandomNum(0, HEIGHT - 1); // 0 - 23 => 24
    for (let x = 0; x < WIDTH; x++) {
      map[row][x] = "";
    }
  }

  // Вертикальные проходы rowCount = 4
  for (let j = 0; j < colCount; j++) {
    const col = getRandomNum(0, WIDTH - 1); // 0 - 39 = 40
    for (let y = 0; y < HEIGHT; y++) {
      map[y][col] = "";
    }
  }
}

// ------------------------------- Этап 5 ------------------------------------
// Разместить мечи (2 шт) и зелья здоровья (10 шт) в пустых местах
// Поместить героя в случайное пустое место
// Поместить 10 противников с случайные пустые места

function placeItems() {
  const emptyCells = [];
  // Ищем все пустые клетки
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (map[y][x] === "") {
        emptyCells.push({ y, x }); // {y: 0, x: 4}
      }
    }
  }
  // Рандомно перемещаем значения в массиве
  shuffleArray(emptyCells);

  // index для того что бы элементы раставлялись по разным ячейкам на карте
  let index = 0;

  // Рандомно размещаем мечи по пустым ячейкам
  placeOnTheMap("SW", 2, emptyCells, index);

  // Рандомно размещаем зелья по пустым ячейкам
  placeOnTheMap("HP", 10, emptyCells, (index += 2));

  // Рандомно размещаем главного героя по пустым ячейкам
  placeOnTheMap("P", 1, emptyCells, (index += 10));

  // Рандомно размещаем 10 противников  по пустым ячейкам
  placeOnTheMap("E", 10, emptyCells, (index += 11));
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Вспомгательная функция для циклов
function placeOnTheMap(symbol, count, emptyCells, startIndex) {
  for (let i = 0; i < count; i++) {
    const { y, x } = emptyCells[startIndex + i];
    map[y][x] = symbol;
  }
}

// ------------------------------- Этап 6 ------------------------------------
// Сделать возможность передвижения героя клавишами WASD
// (влево-вверх-вниз-вправо)
// Сделать возможность атаки клавишей пробел ВСЕХ противников находящихся на соседних клетках

// Находим  коодинаты игрока на поле
function findPlayer() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (map[y][x] === "P") {
        console.log(`y ${y}; x ${x}`);
        return { y, x };
      }
    }
  }
  return null;
}
// Создаю функцию упарвления игроком с помошью клавищ  WASD
function handleKeyPlayer(event) {
  const key = event.key;
  const { y, x } = findPlayer();
  console.log(`y ${y}; x ${x}`); // 7 6
  if (key === "w") {
    movePlayer(y, x, -1, 0);
    renderMap(); // перересовываем карту
  }
  if (key === "s") {
    movePlayer(y, x, 1, 0);
    renderMap();
  }
  if (key === "d") {
    movePlayer(y, x, 0, 1);
    renderMap();
  }
  if (key === "a") {
    movePlayer(y, x, 0, -1);
    renderMap();
  }
  if (event.code === "Space") {
    attackTheEnemy(y, x);
    renderMap();
  }
}

// Фукнция передвижения
function movePlayer(y, x, dy, dx) {
  const newY = y + dy;
  const newX = x + dx;
  // Проверка на границы и проходимость
  if (
    newY >= 0 &&
    newY < HEIGHT &&
    newX >= 0 &&
    newX < WIDTH &&
    (map[newY][newX] === "" || map[newY][newX] === "HP")
  ) {
    map[y][x] = "";
    map[newY][newX] = "P";
  }
}

// ------------------------------- Этап 7 ------------------------------------
// Сделать возможность атаки клавишей пробел ВСЕХ противников
// находящихся на соседних клетках
// Сделать атаку героя противником, если герой находится на соседней клетке с противником

function attackTheEnemy(y, x) {
  const direction = [
    { dy: -1, dx: 0 }, // вниз
    { dy: 1, dx: 0 }, // вверх
    { dy: 0, dx: -1 }, // влево
    { dy: 0, dx: 1 }, // вправо
  ];
  for (let { dy, dx } of direction) {
    const newY = y + dy;
    const newX = x + dx;

    if (
      (newY >= 0 && newY < HEIGHT && newX >= 0 && newX < WIDTH) ||
      map[newY][newX] === "P"
    ) {
      map[newY][newX] = "";
    }
  }
}

window.addEventListener("keydown", handleKeyPlayer);
window.addEventListener("DOMContentLoaded", init);
