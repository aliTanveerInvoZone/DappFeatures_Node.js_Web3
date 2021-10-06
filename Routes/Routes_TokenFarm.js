const express = require("express");
const router = express.Router();
const Web3Controller = require("../Controllers/index.js");

router.get("/getDaiTokenBalance/:accountAddress", (req, res) => {
  Web3Controller.TokenFarmController.getDaiTokenBalance(req, res);
});
router.get("/getTokenFarmBalance/:accountAddress", (req, res) => {
  Web3Controller.TokenFarmController.getTokenFarmBalance(req, res);
});

router.post("/stakeTokens", (req, res) => {
  Web3Controller.TokenFarmController.stakeTokens(req, res);
});

router.post("/unStakeTokens", (req, res) => {
  Web3Controller.TokenFarmController.unStakeTokens(req, res);
});

module.exports = router;
