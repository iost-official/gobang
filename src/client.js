const IOST = require('iost');

class Client {
    constructor(host, cid, id, account) {
        this.host = host;

        this.constractID = cid;
        this.gameID = id;
        this.provider = new IOST.HTTPProvider(this.host);

        this.iost = new IOST.IOST({
            gasRatio: 1,
            gasLimit: 100000,
            delay: 0,
        }, this.provider);
        this.account = account;

        this.rpc = new IOST.RPC(this.provider);
    }
    move(x, y, hash) {
        // send a call
        let tx = this.iost.callABI(this.constractID, "move", [parseInt(this.gameID), x, y, hash]);
        this.account.signTx(tx);
        return new IOST.TxHandler(tx, this.rpc)

    }
    newGameWith(op) {
        let tx = this.iost.callABI(this.constractID, 'newGameWith', [op]);
        this.account.signTx(tx);
        return new IOST.TxHandler(tx, this.rpc)

    }
    pull() {
        const self = this;
        return self.rpc.blockchain.getContractStorage(this.constractID, "games" +this.gameID, true)
    }
}

function test() {

}

test();

module.exports = Client;