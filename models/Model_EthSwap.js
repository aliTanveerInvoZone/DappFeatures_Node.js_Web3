const ContractABI = require("../src/abis/EthSwap.json");
const TokenContractABI = require("../src/abis/Token.json");

let EthSwapModel = {};

let Contract = undefined;
let TokenContract = undefined;

let Web3;
let gasConfig;

EthSwapModel.InitWeb3 = (web3) => {
  Web3 = web3;
  if (!Contract || !TokenContract) {
    initContracts(web3);
  }
};

function initContracts(web3) {
  web3.eth.net.getId().then((networkID) => {
    let contractData = ContractABI.networks[networkID];
    if (contractData) {
      let contractABI = ContractABI.abi;
      Contract = new web3.eth.Contract(contractABI, contractData.address);
    }
    let TokenContractData = TokenContractABI.networks[networkID];

    if (TokenContractData) {
      let tokenContractAbi = TokenContractABI.abi;
      TokenContract = new web3.eth.Contract(tokenContractAbi, TokenContractData.address);
    }
  });
  gasConfig = {
    gasPrice: Web3.utils.toHex(Web3.utils.toWei("8", "gwei")),
    gasLimit: Web3.utils.toHex(30000000),
    gas: 5000000,
  };
}

EthSwapModel.buyTokens = async function (value, accountAddress) {
  if (Contract) {
    try {
      let buyTokens = await Contract.methods.buyTokens().send({
        from: accountAddress,
        value,
        ...gasConfig,
      });
      if (buyTokens.status) {
        return createResponseObject(true, buyTokens, "Success ");
      }
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

EthSwapModel.sellTokens = async function (value, accountAddress) {
  if (Contract && TokenContract) {
    console.log("Contract._address", Contract._address);
    try {
      let approval = await TokenContract.methods.approve(Contract._address, value).send({
        from: accountAddress,
        ...gasConfig,
      });

      if (approval.status) {
        let selltokens = await Contract.methods.sellTokens(value).send({ from: accountAddress, ...gasConfig });
        if (selltokens.status) {
          return createResponseObject(true, selltokens, "Success ");
        }
      }
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

EthSwapModel.getTokenBalance = async function (accountAddress) {
  if (TokenContract) {
    try {
      let balance = await TokenContract.methods.balanceOf(accountAddress).call();
      console.log("balance", balance);
      if (balance) {
        return createResponseObject(true, balance, "Success ");
      }
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

function createResponseObject(success, data, message) {
  console.log("EthSwap Model Response ====> ", { success, data, message });
  return { success, data, message };
}

module.exports = EthSwapModel;
