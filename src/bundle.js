/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const IOST = require('iost');\n// const bs58 = require('bs58');\n//\n// // init iost sdk\n// let iost = new IOST.IOST({ // 如果不设置则使用default配置来发交易\n//     gasPrice: 100,\n//     gasLimit: 100000,\n//     delay:0,\n// }, new IOST.HTTPProvider('http://localhost:30001'));\n//\n// let account = \"abc\";\n// let kp = new IOST.KeyPair(bs58.decode('1rANSfcRzr4HkhbUFZ7L1Zp69JZZHiDDq5v7dNSbbEqeU4jxy3fszV4HGiaLQEyqVpS1dKT9g7zCVRxBVzuiUzB'));\n//\n// iost.setPublisher(account, kp);\n//\n// move : function (step, x, y) {\n//     // send a call\n//     let handler = iost.callABI(\"iost.token\", \"transfer\", [\"iost\", \"form\", \"to\", \"1000.000\"]);\n//\n//     handler\n//         .onPending(function (response) {\n//             console.log(\"tx: \"+ response.hash + \" has sent to node\")\n//         })\n//         .onSuccess(function (response) {\n//             console.log(\"tx has on chain, here is the receipt: \"+ JSON.stringify(response))\n//         })\n//         .onFailed(console.log)\n//         .send();\n// },\n\n\nclass Chess {\n    constructor() {\n        this.data = new Array(15);//这个为棋盘的二维数组用来保存棋盘信息，初始化0为没有走过的，1为白棋走的，2为黑棋走的\n        for (let x = 0; x < 15; x++) {\n            this.data[x] = new Array(15);\n            for (let y = 0; y < 15; y++) {\n                this.data[x][y] = 0;\n            }\n        }\n        this.count = 0;\n    }\n    move(chess, x, y) {\n        this.data[x][y] = chess;\n        this.count ++\n    }\n    chess(x, y) {\n        return this.data[x][y];\n    }\n    isWhite() {\n        return this.count % 2 === 1\n    }\n    isPlayed(x, y) {\n        return this.data[x][y] !== 0\n    }\n    isEnd() {\n        return false\n    }\n\n}\n\nclass Page {\n    constructor(document) {\n        this.chess = new Chess();\n        this.img_b = new Image();\n        this.img_b.src = \"images/b.png\";//白棋图片\n        this.img_w = new Image();\n        this.img_w.src = \"images/w.png\";//黑棋图片\n        this.canvas = document.getElementById(\"canvas\");\n        this.canvas.onmousedown = this.play.bind(this);\n        this.context = this.canvas.getContext(\"2d\");\n    }\n    play(e){\n        let x = parseInt((e.clientX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置\n        let y = parseInt((e.clientY - 20) / 40);\n\n        if (this.chess.isPlayed(x,y)) {//判断该位置是否被下过了\n            alert(\"你不能在这个位置下棋\");\n            return;\n        }\n        if (this.chess.isWhite()) {\n            this.drawChess(1, x, y);\n            this.chess.move(1, x, y);\n        }\n        else {\n            this.drawChess(2, x, y);\n            this.chess.move(2, x, y);\n        }\n        // move(count++, x, y)\n    }\n    drawRect() {//页面加载完毕调用函数，初始化棋盘\n        for (let i = 0; i <= 640; i += 40) {//绘制棋盘的线\n            this.context.beginPath();\n            this.context.moveTo(0, i);\n            this.context.lineTo(640, i);\n            this.context.closePath();\n            this.context.stroke();\n            this.context.beginPath();\n            this.context.moveTo(i, 0);\n            this.context.lineTo(i, 640);\n            this.context.closePath();\n            this.context.stroke();\n        }\n    }\n    drawChess(chess, x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置\n        if (x >= 0 && x < 15 && y >= 0 && y < 15) {\n            if (chess === 1) {\n                this.context.drawImage(this.img_w, x * 40 + 20, y * 40 + 20);//绘制白棋\n            }\n            else if (chess === 2) {\n                this.context.drawImage(this.img_b, x * 40 + 20, y * 40 + 20);\n            }\n            // this.chess.move(chess, x, y)\n\n            // judge(x, y, chess);\n        }\n    }\n    refresh() {\n        this.context.clearRect(0, 0, 640, 640);\n        this.drawRect();\n        for (let x = 0; x < 15; x ++) {\n            for (let y = 0; y < 15; y ++) {\n                this.drawChess(this.chess.chess(x, y), x, y)\n            }\n        }\n    }\n}\n\nlet page;\nfunction init() {\n    page = new Page(document);\n    page.drawRect();\n    document.getElementById('create').onclick = page.refresh.bind(page);\n}\n\nwindow.onload = init;\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });