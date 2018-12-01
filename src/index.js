// const IOST = require('./iost');

class Chess {
    constructor() {
        this.data = new Array(15);//这个为棋盘的二维数组用来保存棋盘信息，初始化0为没有走过的，1为白棋走的，2为黑棋走的
        for (let x = 0; x < 15; x++) {
            this.data[x] = new Array(15);
            for (let y = 0; y < 15; y++) {
                this.data[x][y] = 0;
            }
        }
        this.count = 0;
    }
    move(chess, x, y) {
        this.data[x][y] = chess;
        this.count ++
    }
    chess(x, y) {
        return this.data[x][y];
    }
    isWhite() {
        return this.count % 2 === 1
    }
    isPlayed(x, y) {
        return this.data[x][y] !== 0
    }
    isEnd() {
        return false
    }

}

class Page {
    constructor(document) {
        this.chess = new Chess();
        this.img_b = new Image();
        this.img_b.src = "images/b.png";//白棋图片
        this.img_w = new Image();
        this.img_w.src = "images/w.png";//黑棋图片
        this.canvas = document.getElementById("canvas");
        this.canvas.onmousedown = this.play.bind(this);
        this.context = this.canvas.getContext("2d");

        // this.iost = new IOST("contractID", "gameID")
    }
    play(e){
        let x = parseInt((e.clientX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
        let y = parseInt((e.clientY - 20) / 40);

        if (this.chess.isPlayed(x,y)) {//判断该位置是否被下过了
            alert("你不能在这个位置下棋");
            return;
        }
        if (this.chess.isWhite()) {
            this.drawChess(1, x, y);
            this.chess.move(1, x, y);
        }  else {
            this.drawChess(2, x, y);
            this.chess.move(2, x, y);
        }
        // move(count++, x, y)
    }
    drawRect() {//页面加载完毕调用函数，初始化棋盘
        for (let i = 0; i <= 640; i += 40) {//绘制棋盘的线
            this.context.beginPath();
            this.context.moveTo(0, i);
            this.context.lineTo(640, i);
            this.context.closePath();
            this.context.stroke();
            this.context.beginPath();
            this.context.moveTo(i, 0);
            this.context.lineTo(i, 640);
            this.context.closePath();
            this.context.stroke();
        }
    }
    drawChess(chess, x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置
        if (x >= 0 && x < 15 && y >= 0 && y < 15) {
            if (chess === 1) {
                this.context.drawImage(this.img_w, x * 40 + 20, y * 40 + 20);//绘制白棋
            }
            else if (chess === 2) {
                this.context.drawImage(this.img_b, x * 40 + 20, y * 40 + 20);
            }
            // this.chess.move(chess, x, y)

            // judge(x, y, chess);
        }
    }
    refresh() {
        this.context.clearRect(0, 0, 640, 640);
        this.drawRect();
        for (let x = 0; x < 15; x ++) {
            for (let y = 0; y < 15; y ++) {
                this.drawChess(this.chess.chess(x, y), x, y)
            }
        }
    }
    pull() {

    }
}

let page;
function init() {
    page = new Page(document);
    page.drawRect();
    document.getElementById('create').onclick = page.refresh.bind(page);
}

window.onload = init;
