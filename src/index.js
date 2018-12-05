const IOST = require('./iost');
const Game = require('./model');

let host;
let contractID;

let page, room, account, seckey, iost, alg, opponent;

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

    create() {
        const self = this;
        iost.newGameWith(opponent.value)
            .onPending(function (res) {
            })
            .onSuccess(function (res) {
                console.log(res);
                room.value = JSON.parse(res.returns[0])[0];
                iost.gameID = parseInt(room.value);
                pull(page, iost);
            })
            .onFailed(function (res) {
                alert("FAILED: " + JSON.stringify(res));
            })
            .send()
            .listen(1000, 90)
    }

    play(e) {
        let x = parseInt((e.clientX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
        let y = parseInt((e.clientY - 20) / 40);
        if (x < 0 || x > 14 || y < 0 || y > 14) {
            return
        }

        let rtn = this.game.move(this.player, x, y);
        if (rtn !== 0) {
            alert(rtn);
            return
        }
        this.refresh();

        iost.move(x, y, this.game.hash)
            .onPending(function (res) {
            })
            .onSuccess(function (res) {
                setTimeout(pull, 1000, page, iost)
            })
            .onFailed(function (res) {
                alert("FAILED: " + JSON.stringify(res));
                pull(page, iost);
            })
            .send()
            .listen(1000, 90)

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
}


function pull(page, iost) {
    if (page.game.winner !== null) {
        return
    }
    if (!page.game.isTurn(page.player)) {
        iost.pull()
            .then(function (json) {
                page.game = Game.fromJSON(json.jsonStr);
                page.refresh();
                setTimeout(pull, 1000, page, iost)
            })
            .catch(function (err) {
                console.log(JSON.stringify(err));
                setTimeout(pull, 1000, page, iost)
            })
    }
}

function create() {
    iost = new IOST(host.value,
        contractID.value,
        room.value,
        account.value,
        seckey.value,
        alg.value==="secp"?1:2);

    page = new Page(document, account.value);
    page.create();
}

function enter() {
    page = new Page(document, account.value);

    iost = new IOST(host.value,
        contractID.value,
        room.value,
        account.value,
        seckey.value,
        alg.value==="secp"?1:2);

    pull(page, iost);
}

function onload() {
    document.getElementById('create').onclick = create;
    document.getElementById('enter').onclick = enter;

    room = document.getElementById('room');
    account = document.getElementById('account');
    seckey = document.getElementById('seckey');
    alg = document.getElementById('alg');
    opponent = document.getElementById('opponent');
    host = document.getElementById('host');
    contractID = document.getElementById('contractID');

}

Window.onload = onload();


