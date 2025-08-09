// const directions = [
//   { dy: -1, dx: 0 }, // вверх
//   { dy: 1, dx: 0 }, // вниз
//   { dy: 0, dx: -1 }, // влево
//   { dy: 0, dx: 1 }, // вправо
// ];

// for (let { dy, dx } of directions) {

//   console.log(`y = ${dy}; x = ${dx}`);
// }

const directions = [
  { dy: -1, dx: 0 }, // вверх
  { dy: 1, dx: 0 }, // вниз
  { dy: 0, dx: -1 }, // влево
  { dy: 0, dx: 1 }, // вправо
];

let dirs = [...directions];

const diagonals = [
  { dy: -1, dx: -1 }, // вверх
  { dy: -1, dx: 1 }, // вниз
  { dy: 1, dx: -1 }, // влево
  { dy: 1, dx: 1 }, // вправо
];

const range2 = [
  { dy: -2, dx: 0 }, // вверх
  { dy: 2, dx: 0 }, // вниз
  { dy: 0, dx: -2 }, // влево
  { dy: 0, dx: 2 }, // вправо
];

dirs = [...dirs, ...diagonals, ...range2];
console.log(dirs);

for (let { dy, dx } of dirs) {
  console.log(`dy ${dy}; dx ${dx}`);
}
