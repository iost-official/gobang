const IOST = require('iost');
const bs58 = require('bs58');

class Client {
    constructor(host, cid, id, account, seckey, algType) {
        this.host = host;

        this.constractID = cid;
        this.gameID = id;
        this.provider = new IOST.HTTPProvider(this.host);

        this.iost = new IOST.IOST({
            gasPrice: 100,
            gasLimit: 100000,
            delay: 0,
        }, this.provider);
        this.account = account;
        this.kp = new IOST.KeyPair(bs58.decode(seckey), algType);
        this.iost.setPublisher(this.account, this.kp);

        this.rpc = new IOST.RPC(this.provider);
    }
    move(x, y, hash) {
        // send a call
        return this.iost.callABI("gobang.demo", "move", [parseInt(this.gameID), x, y, hash]);

    }
    newGameWith(op) {
        return this.iost.callABI("gobang.demo", 'newGameWith', [op]);
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