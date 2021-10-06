const express = require("express");
const router = express.Router();
const Web3Controller = require("../Controllers/index.js");

router.post("/buyTokens", (req, res) => {
  Web3Controller.EthSwapController.buyTokens(req, res);
});
router.post("/sellTokens", (req, res) => {
  Web3Controller.EthSwapController.sellTokens(req, res);
});

router.get("/getTokensBalance/:accountAddress", (req, res) => {
  Web3Controller.EthSwapController.getTokenBalance(req, res);
});

module.exports = router;
