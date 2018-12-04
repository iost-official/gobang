const Game = require('./model');

const g = new Game("admin", "playerb");

console.log(g.move("admin", 7,7));
console.log(g.move("playerb", 7,8));
console.log(g.move("admin", 8,7));
console.log(g.move("playerb", 8,8));
console.log(g.move("admin", 9,7));
console.log(g.move("playerb", 9,8));
console.log(g.move("admin", 10,7));
console.log(g.move("playerb", 10,8));
console.log(g.move("admin", 11,7));
console.log(g.move("playerb", 11,8));
console.log(g.winner);