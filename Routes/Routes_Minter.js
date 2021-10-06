const express = require("express");
const router = express.Router();
const Web3Controller = require("../Controllers/index.js");

router.post("/mintNFT", (req, res) => {
  Web3Controller.MinterController.mintNFT(req, res);
});
router.get("/getNFTs", (req, res) => {
  Web3Controller.MinterController.getNFTs(req, res);
});

module.exports = router;
