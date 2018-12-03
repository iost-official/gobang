class Board {
    constructor(b){
        this.record = b;
    }

    isAvailable(x, y) {
        return this.record[x + "," + y] === undefined
    }
    move(x, y, step) {
        this.record[x + "," + y] = step
    }
    color(x, y) { // 0 black; 1 white
        if (this.isAvailable(x,y)) {
            return 2
        }
        return this.record[x + "," + y] % 2
    }
}

class Game {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.count = 0;
        this.board = new Board({});
        this.winner = null;
        this.hash = ""
    }

    isTurn(player) {
        return (this.count % 2 === 0 && player === this.a) ||
            (this.count % 2 === 1 && player === this.b)
    }

    move(player, x, y) {
        if (this.winner !== null) {
            return "this game has come to a close"
        }

        if (!this.isTurn(player)) {
            return "error player"
        }

        if (!this.board.isAvailable(x, y)) {
            return "this cross has marked"
        }
        this.board.move(x, y, this.count ++);
        if (this._result(x, y)) {
            this.winner = player
        }
        return 0
    }

    _result(x, y) {
        return this._count(x, y, 1, 0) >= 5 ||
            this._count(x, y, 0, 1) >= 5 ||
            this._count(x, y, 1, 1) >= 5 ||
            this._count(x, y, 1, -1) >= 5;
    }

    _count(x, y, stepx, stepy) {
        let count = 1;
        const color = this.board.color(x,y);
        let cx = x;
        let cy = y;
        for (let i = 0; i < 4; i ++) {
            cx += stepx;
            cy += stepy;
            if (!Game._checkBound(cx) || !Game._checkBound(cy)) break;
            if (color !== this.board.color(cx, cy)) break;
            count++
        }
        cx = x;
        cy = y;
        for (let i = 0; i < 4; i ++) {
            cx -= stepx;
            cy -= stepy;
            if (color !== this.board.color(cx, cy)) break;
            count++
        }
        return count
    }

    static _checkBound(i) {
        return !(i < 0 || i >= 15);

    }

    static fromJSON(json) {
        const obj = JSON.parse(json);
        let g = new Game(obj.a, obj.b);
        g.count = obj.count;
        g.winner = obj.winner;
        g.hash = obj.hash;
        g.board = new Board(obj.board.record);
        return g
    }
}

module.exports = Game