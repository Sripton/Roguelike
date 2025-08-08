const directions = [
  { dy: -1, dx: 0 }, // вверх
  { dy: 1, dx: 0 }, // вниз
  { dy: 0, dx: -1 }, // влево
  { dy: 0, dx: 1 }, // вправо
];

for (let { dy, dx } of directions) {
   
  console.log(`y = ${dy}; x = ${dx}`);
}
