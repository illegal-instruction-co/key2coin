const CryptoJS = require('crypto-js')
const config = require('../config')

/*
Modular functions
*/
const Log = require('./log')

const K2C = {

  CryptoBlock: class {

    #key_;
    #precedingHash;

    /*
    Constructor of crypto block
    */
    constructor(index, timestamp, key_, data, precedingHash=" "){
      this.index = index;
      this.timestamp = timestamp;
      this.#key_ = key_;
      this.data = data;
      this.#precedingHash = precedingHash;
      this.hash = this.computeHash();
    }

    /*
    Hashing block
    key existing in hash for check ownership of paper
    at use ownership processes
    */
    computeHash(){
      return CryptoJS.SHA256(this.#key_ + this.index + this.#precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

  },

  BlockChain: class {

    /*
    Constructor of Key2Coin safe
    block chain
    */
    constructor(){
      this.blockchain = [this.startGenesisBlock()];
    }

    /*
    Key2Coin initial signature
    */
    startGenesisBlock(){
      return new K2C.CryptoBlock(0, "15/03/2021", "00000000-0000-0000-0000-000000000000", ".Initial signature of Key2Coin.", "0");
    }

    /*
    Returns blocks last block
    */
    obtainLatestBlock(){
      return this.blockchain[this.blockchain.length - 1];
    }

    /*
    Checks block integrity
    */
    checkChainValidity() {
      for (let i = 1; i < this.blockchain.length; i++) {
        const currentBlock = this.blockchain[i];
        const precedingBlock = this.blockchain[i - 1];

        if (currentBlock.hash !== currentBlock.computeHash()) {
          return currentBlock.hash;
        }
        if (currentBlock.precedingHash !== precedingBlock.hash) return currentBlock.hash;
      }
      return true;
    }

    /*
    Implements new block to existing chain
    */
    addNewBlock(newBlock) {

      /*
      Break the transactions if there
      is a crack in the chain
      */
      var checkPoint = this.checkChainValidity()
      if(checkPoint !== true) {
        return Log(config.basis.error_log_prefix, {
          step: 'Implementing new block to chain',
          error: 'Crack detected',
          address: checkPoint

        })
      }

      newBlock.precedingHash = this.obtainLatestBlock().hash;
      newBlock.hash = newBlock.computeHash();
      this.blockchain.push(newBlock);
    }

  }

}

/*
Proof of concept
*/

const proofOfConceptSafe = () => {

  let k2cSafe = new K2C.BlockChain()

  var fB = new K2C.CryptoBlock(1, "15/03/2021", "00000000-0000-0000-0000-000000000001", {
    crypto_name: "BTC",
    crypto_voucher_total: 55.05,
    payment_total: 57.02
  })

  var sB = new K2C.CryptoBlock(2, "15/03/2021", "00000000-0000-0000-0000-000000000002", {
    crypto_name: "ETH",
    crypto_voucher_total: 21.05,
    full_name: "Daniel Leinad"
  })

  k2cSafe.addNewBlock(fB), k2cSafe.addNewBlock(sB)

  return Log(config.basis.log_prefix, {
    concept: "Safe",
    chain: JSON.stringify(k2cSafe, null, 4)
  })

}

const proofOfConceptVoucher = () => {

  let k2cVoucher = new K2C.BlockChain()

  var fB = new K2C.CryptoBlock(1, "16/03/2021", "00000000-0000-0000-0000-000000000001", {
    hash: "95c3247d5a2f2e6977ca5b35be67c1ffc2e487ed9c71670b77abb218c4e9d205"
  })

  var sB = new K2C.CryptoBlock(2, "16/03/2021", "00000000-0000-0000-0000-000000000002", {
    hash: "f32cf51d6774e65afcea15072ca5ec44f769f79c491ecadcf6ad539da0162d5c"
  })

  k2cVoucher.addNewBlock(fB), k2cVoucher.addNewBlock(sB)

  return Log(config.basis.log_prefix, {
    concept: "Voucher",
    chain: JSON.stringify(k2cVoucher, null, 4)
  })

}

// proofOfConceptSafe()
// proofOfConceptVoucher()




module.exports = K2C;
