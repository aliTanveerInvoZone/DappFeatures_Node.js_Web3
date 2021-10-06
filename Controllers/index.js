const MinterController = require("./Controller_Minter");
const EthSwapController = require("./Controller_EthSwap");
const TokenFarmController = require("./Controller_TokenFarm");
const {
  web3,
  MinterModel,
  IPFSModel,
  EthSwapModel,
  getAccountBalance,
  getAccounts,
  TokenFarmModel,
} = require("../models/index");

const Controller = {};

Controller.getAccounts = function (req, res) {
  try {
    getAccounts().then((resp) => {
      if (res.statusCode === 200) {
        return res.send(createResponseBody(res.statusCode, resp, "Success"));
      }
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

Controller.getAccountBalance = function (req, res) {
  if (req.params.accountAddress) {
    try {
      getAccountBalance(req.params.accountAddress).then((resp) => {
        if (res.statusCode === 200) {
          return res.send(createResponseBody(res.statusCode, resp, "Success"));
        }
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  } else {
    res.status(400).send(createResponseBody(res.statusCode, null, "Account Address is required"));
  }
};
MinterController.InitModel({ MinterModel, IPFSModel });
Controller.MinterController = MinterController;

EthSwapController.InitModel({ EthSwapModel, web3 });
Controller.EthSwapController = EthSwapController;

TokenFarmController.InitModel({ TokenFarmModel, web3 });
Controller.TokenFarmController = TokenFarmController;

function createResponseBody(statusCode, body, message) {
  console.log("Web3 Controller Current Response ===> ", { statusCode, body, message });
  return { statusCode, body, message };
}

module.exports = Controller;
