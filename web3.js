const Web3 = require("web3");
const ContractAbi = require("./src/abis/UniqueAsset.json");

let web3 = {};

web3.web3Init = async (callback) => {
  let accounts = [];
  let contract;

  const web3 = new Web3("ws://localhost:7545");
  accounts = await web3.eth.getAccounts();
  const networkID = await web3.eth.net.getId();
  let ContractData = ContractAbi.networks[networkID];
  if (ContractData) {
    let contractAbi = ContractAbi.abi;
    contract = new web3.eth.Contract(contractAbi, ContractData.address);
  } else {
    throw new Error("Contracts not deployed");
  }

  return { accounts, contract };
};

module.exports = web3;
