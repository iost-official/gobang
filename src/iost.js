const IOST = require('iost');
const bs58 = require('bs58');

class Client {
    constructor(host, cid, id, account, seckey) {
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
        this.kp = new IOST.KeyPair(bs58.decode(seckey));
        this.iost.setPublisher(this.account, this.kp);

        this.rpc = new IOST.RPC(this.provider);
    }
    move(step, x, y) {
        // send a call
        let handler = this.iost.callABI("iost.token", "transfer", ["iost", "form", "to", "1000.000"]);

        handler
            .onPending(function (response) {
                console.log("tx: " + response.hash + " has sent to node")
            })
            .onSuccess(function (response) {
                console.log("tx has on chain, here is the receipt: " + JSON.stringify(response))
            })
            .onFailed(console.log)
            .send();
    }
    pull() {
        const self = this;
        return self.rpc.blockchain.getContractStorage(this.constractID, "games", "no" +this.gameID, true)
    }
}

function test() {

}

test();

module.exports = Client;