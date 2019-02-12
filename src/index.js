const Client = require('./client');
const IOST = require('iost');
const Game = require('./model');
const bs58 = require('bs58');

let host;
let contractID;

let page, room, account, seckey, iost, alg, opponent, get_account;

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
        const txh = iost.newGameWith(opponent.value);
        txh.onPending(function (res) {
        })
            .onSuccess(function (res) {
                console.log(res);
                room.value = JSON.parse(res.returns[0])[0];
                iost.gameID = parseInt(room.value);
                pull(page, iost);
            })
            .onFailed(function (res) {
                alert("create FAILED: " + JSON.stringify(res));
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
            // alert(rtn);
            return
        }
        this.refresh();

        const handler = iost.move(x, y, this.game.hash);
        handler
            .onPending(function (res) {
            })
            .onSuccess(function (res) {
                setTimeout(pull, 1000, page, iost)
            })
            .onFailed(function (res) {
                // alert("FAILED: " + JSON.stringify(res));
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
        opponent.value = this.game.b
    }
}


function pull(page, iost) {
    if (page.game.winner !== null) {
        console.log(page.game);
        return
    }
    if (!page.game.isTurn(page.player)) {
        iost.pull()
            .then(function (json) {
                page.game = Game.fromJSON(json.data);
                page.refresh();
                setTimeout(pull, 1000, page, iost)
            })
            .catch(function (err) {
                console.log(JSON.stringify(err));
                if (err === {}) return;
                setTimeout(pull, 1000, page, iost)
            })
    }
}

function create() {
    if (opponent.value.length < 1) {
        alert("illegal opponent!");
        return
    }

    let wallet;
    if (!(account.value.length > 0 && seckey.value.length > 0)) {
        alert("illegal account settings!")
    }

    wallet = new IOST.Account(account.value);
    let kp = new IOST.KeyPair(bs58.decode(seckey.value), alg.value === "secp" ? 1 : 2);
    wallet.addKeyPair(kp, "active");

    iost = new Client(host.value,
        contractID.value,
        room.value,
        wallet
    );

    page = new Page(document, account.value);
    page.create();
}

function enter() {
    if (room.value.length < 1) {
        alert("illegal game id!");
        return
    }

    page = new Page(document, account.value);
    let wallet;
    if (account.value.length > 0 && seckey.value.length > 0) {
        wallet = new IOST.Account(account.value);
        let kp = new IOST.KeyPair(bs58.decode(seckey.value), alg.value === "secp" ? 1 : 2);
        wallet.addKeyPair(kp, "active");
    }
    iost = new Client(host.value,
        contractID.value,
        room.value,
        wallet
    );

    pull(page, iost);
}

function newAccount() {

    const privkey = '5RjgD3JZVKZGxj9ZYHRaHhZVtk8MXTXtm5iu8UaW8xsYtceXtc6pcFZgHqGqedSAotiAQ4Kjuov5MU2AzqEB3ApG';

    const iost = new IOST.IOST({ // 如果不设置则使用default配置来发交易
        gasRatio: 1,
        gasLimit: 200000,
        delay: 0,
        expiration: 90,
    });

    const rpc = new IOST.RPC(new IOST.HTTPProvider(host.value));

    // init admin account
    const acc = new IOST.Account("gobangmaker");
    const kp = new IOST.KeyPair(bs58.decode(privkey));
    acc.addKeyPair(kp, "active");

    const name = Math.random().toString(36).substr(2, 12);
    const tx = iost.newAccount(name, "gobangmaker", kp.id, kp.id, 0, 100000);
    acc.signTx(tx);

    const handler = new IOST.TxHandler(tx, rpc);
    handler
        .onPending(function () {
            alert("request test account");
            get_account.disabled = true;
        })
        .onSuccess(function () {
            account.value = name;
            seckey.value = privkey;
        })
        .onFailed(function (err) {
            alert("failed :" + JSON.stringify(err));
        })
        .send()
        .listen(1000, 90);

}

function onload() {
    document.getElementById('create').onclick = create;
    document.getElementById('enter').onclick = enter;

    get_account = document.getElementById('new_account');
    get_account.onclick = newAccount;

    room = document.getElementById('room');
    account = document.getElementById('account');
    seckey = document.getElementById('seckey');
    alg = document.getElementById('alg');
    opponent = document.getElementById('opponent');
    host = document.getElementById('host');
    contractID = document.getElementById('contractID');
    // info = document.getElementById('info');
}

Window.onload = onload();


