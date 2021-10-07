const Web3 = require("web3");
var HDWalletProvider = require("truffle-hdwallet-provider");
const HTTP_PROVIDER = "https://rinkeby.infura.io/v3/686ea6bb429446ba99f90a53100434f5";
const PRIVATE_KEYS = ["e8862a89dcd4a0dba199679f06f76bdb02b9f80c0241a7efde545034d54b12c9"];
const hDWalletProvider = new HDWalletProvider(PRIVATE_KEYS, HTTP_PROVIDER);
const web3 = new Web3("ws://127.0.0.1:7545");
const MinterModel = require("./Model_Minter");
const IPFSModel = require("./Model_IPFS");
const EthSwapModel = require("./Model_EthSwap");
const TokenFarmModel = require("./Model_TokenFarm");
// const web3 = new Web3("ws://localhost:7545");
const Web3Model = {};

Web3Model.getAccounts = async function () {
  try {
    return await web3.eth.getAccounts();
  } catch (e) {
    return "Problem with web3";
  }
};

Web3Model.getAccountBalance = async function (accountAddress) {
  try {
    let balance = await web3.eth.getBalance(accountAddress);
    return web3.utils.fromWei(balance, "ether");
  } catch (e) {
    return "Problem with web3";
  }
};

MinterModel.InitWeb3(web3);
Web3Model.MinterModel = MinterModel;

EthSwapModel.InitWeb3(web3);
Web3Model.EthSwapModel = EthSwapModel;

TokenFarmModel.InitWeb3(web3);
Web3Model.TokenFarmModel = TokenFarmModel;

Web3Model.IPFSModel = IPFSModel;

Web3Model.web3 = web3;

module.exports = Web3Model;
