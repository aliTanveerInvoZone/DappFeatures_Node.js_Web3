const express = require("express");
const router = express.Router();
const MinterRoutes = require("./Routes_Minter.js");
const EthSwapRoutes = require("./Routes_EthSwap.js");
const Web3Controller = require("../Controllers/index.js");
const TokenFarmRoutes = require("../Routes/Routes_TokenFarm");

router.get("/getAccounts", (req, res) => {
  Web3Controller.getAccounts(req, res);
});
router.get("/getAccountBalance/:accountAddress", (req, res) => {
  Web3Controller.getAccountBalance(req, res);
});

router.use(MinterRoutes);
router.use(EthSwapRoutes);
router.use(TokenFarmRoutes);

module.exports = router;
