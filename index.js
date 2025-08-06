const WIDTH = 40; // ширина карты
const HEIGHT = 24; // высота карты
const TILE_SIZE = 50; // размер изображения

let map = []; // 2D массив: "W" = wall, " " = floor
const fieldElement = document.querySelector(".field");

// Инициализация игры
function init() {
  generateMap(); // генерация карты
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

window.addEventListener("DOMContentLoaded", init);
