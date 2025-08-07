const WIDTH = 40; // ширина карты
const HEIGHT = 24; // высота карты
const TILE_SIZE = 50; // размер изображения

let map = []; // 2D массив: "W" = wall, " " = floor
const fieldElement = document.querySelector(".field");

// Инициализация игры
function init() {
  generateMap(); // генерация карты
  generateRandomRooms();
  generateRandomCoridors();
  renderMap(); // отображение карты
}

//  Этап 1 Сгенерировать карту 40x24
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

//  Этап 2 Залить всю карту стеной
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

// Этап 3 Разместить случайное количество (5 - 10) прямоугольных “комнат” со случайными размерами (3 - 8 клеток в длину и ширину)
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

//  Этап 4 Разместить случайное количество (3 - 5 по каждому направлению)
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

window.addEventListener("DOMContentLoaded", init);
