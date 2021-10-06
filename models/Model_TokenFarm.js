const DaiTokenAbi = require("../src/abis/DaiToken.json");
const TokenFarmAbi = require("../src/abis/TokenFarm.json");
const TokenAbi = require("../src/abis/Token.json");

let TokenFarmModel = {};

let daiTokenAContract = undefined;
let tokenFarmContract = undefined;
let tokenContract = undefined;

let Web3;
let gasConfig;

TokenFarmModel.InitWeb3 = (web3) => {
  Web3 = web3;
  if (!daiTokenAContract || !tokenFarmContract || !tokenContract) {
    initContracts(web3);
  }
};

function initContracts(web3) {
  web3.eth.net.getId().then((networkID) => {
    let tokenAbiData = TokenAbi.networks[networkID];
    if (tokenAbiData) {
      let tokenAbi = TokenAbi.abi;
      tokenContract = new web3.eth.Contract(tokenAbi, tokenAbiData.address);
    }
    let DaiTokenContractData = DaiTokenAbi.networks[networkID];

    if (DaiTokenContractData) {
      let daiTokenAbi = DaiTokenAbi.abi;
      daiTokenAContract = new web3.eth.Contract(daiTokenAbi, DaiTokenContractData.address);
    }

    let TokenFarmContractData = TokenFarmAbi.networks[networkID];

    if (TokenFarmContractData) {
      let tokenFarmAbi = TokenFarmAbi.abi;
      tokenFarmContract = new web3.eth.Contract(tokenFarmAbi, TokenFarmContractData.address);
    }
  });
  gasConfig = {
    gasPrice: Web3.utils.toHex(Web3.utils.toWei("8", "gwei")),
    gasLimit: Web3.utils.toHex(30000000),
    gas: 5000000,
  };
}

TokenFarmModel.getDaiTokenBalance = async function (accountAddress) {
  if (daiTokenAContract) {
    try {
      let balance = await daiTokenAContract.methods.balanceOf(accountAddress).call();
      return createResponseObject(true, balance, "");
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

TokenFarmModel.getTokenFarmBalance = async function (accountAddress) {
  if (tokenFarmContract) {
    try {
      let balance = await tokenFarmContract.methods.stakingBalance(accountAddress).call();
      return createResponseObject(true, balance, "");
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

TokenFarmModel.stakeTokens = async function (amount, accountAddress) {
  if (daiTokenAContract && tokenFarmContract) {
    try {
      let approval = await daiTokenAContract.methods.approve(tokenFarmContract._address, amount).send({
        from: accountAddress,
        ...gasConfig,
      });
      if (approval.status) {
        let stakeTokens = await tokenFarmContract.methods
          .StakeTokens(amount)
          .send({ from: accountAddress, ...gasConfig });
        if (stakeTokens.status) {
          return createResponseObject(true, { approval, stakeTokens }, "");
        }
      }
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

TokenFarmModel.unStakeTokens = async function (accountAddress) {
  if (tokenContract) {
    try {
      let unStakeTokens = await tokenFarmContract.methods.unstakeTokens().send({ from: accountAddress, ...gasConfig });
      if (unStakeTokens.status) {
        return createResponseObject(true, unStakeTokens, "");
      }
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

function createResponseObject(success, data, message) {
  console.log("Token Farm Model Response ====> ", { success, data, message });
  return { success, data, message };
}

module.exports = TokenFarmModel;
