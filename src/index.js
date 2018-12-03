const IOST = require('./iost');
const Game = require('./model');

class Page {
    constructor(document, player) {
        this.game = new Game("", "");
        this.img_b = new Image();
        this.img_b.src = "images/b.png";//白棋图片
        this.img_w = new Image();
        this.img_w.src = "images/w.png";//黑棋图片
        this.canvas = document.getElementById("canvas");
        this.canvas.onmousedown = this.play.bind(this);
        this.context = this.canvas.getContext("2d");

        this.player = player
    }

    play(e) {
        let x = parseInt((e.clientX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
        let y = parseInt((e.clientY - 20) / 40);
        if (x < 0 || x > 14 || y < 0 || y > 14) {
            return
        }

        let rtn = this.game.move(this.player, x, y);
        if (rtn !== 0) {
            alert(rtn)
        }
        this.refresh()
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
            else if (chess === 0) {
                this.context.drawImage(this.img_b, x * 40 + 20, y * 40 + 20);
            }
            // this.chess.move(chess, x, y)

            // judge(x, y, chess);
        }
    }

    refresh() {
        this.context.clearRect(0, 0, 640, 640);
        this.drawRect();
        for (let x = 0; x < 15; x++) {
            for (let y = 0; y < 15; y++) {
                this.drawChess(this.game.board.color(x, y), x, y)
            }
        }
    }

    pull(iost) {
        let self = this;
        iost.pull()
            .then(function (json) {
                self.game = Game.fromJSON(json.jsonStr);
                self.refresh()
            })
    }
}

let page, room, account, seckey, iost;

function create() {
    page = new Page(document, true);
    page.refresh();
}

function enter() {
    page = new Page(document, false);

    iost = new IOST("http://localhost:20001", "gobang.demo", room.value, account.value, seckey.value);
    console.log(room.value, account.value, seckey.value);
    page.pull(iost);
}

function onload() {
    document.getElementById('create').onclick = create;
    document.getElementById('enter').onclick = enter;

    room = document.getElementById('room');
    account = document.getElementById('account');
    seckey = document.getElementById('seckey');

}

Window.onload = onload();


