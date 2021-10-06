const ContractABI = require("../src/abis/UniqueAsset.json");

let MinterModel = {};

let Contract = undefined;

let Web3;

MinterModel.InitWeb3 = (web3) => {
  Web3 = web3;
  if (!Contract) {
    initContract(web3);
  }
};

function initContract(web3) {
  web3.eth.net.getId().then((networkID) => {
    let contractData = ContractABI.networks[networkID];
    if (contractData) {
      let contractABI = ContractABI.abi;
      Contract = new web3.eth.Contract(contractABI, contractData.address);
    }
  });
}

MinterModel.mintNFT = async function (uploadHash, accountAddress) {
  if (Contract) {
    try {
      let mint = await Contract.methods.mint(uploadHash).send({
        from: accountAddress,
        gasPrice: Web3.utils.toHex(Web3.utils.toWei("8", "gwei")),
        gasLimit: Web3.utils.toHex(30000000),
        gas: 5000000,
      });
      console.log("mint", mint);

      if (mint.status) {
        return createResponseObject(true, mint, "Minted Success ");
      }
    } catch (e) {
      return createResponseObject(false, "", e.message);
    }
  } else {
    return createResponseObject(false, "", "Contract is not Deployed");
  }
};

MinterModel.getNFTs = async function () {
  try {
    let totalSupply = await Contract.methods.totalSupply().call();
    console.log("totalSupply", totalSupply);
    let NFTsArray = [];
    for (let i = 0; i <= totalSupply - 1; i++) {
      let nft = await Contract.methods.hashes(i).call();
      NFTsArray.push(nft);
    }

    return createResponseObject(true, NFTsArray, "Success");
  } catch (e) {
    return createResponseObject(false, "", e);
  }
};

function createResponseObject(success, data, message) {
  console.log("minter Model Response ----", { success, data, message });
  return { success, data, message };
}

module.exports = MinterModel;
