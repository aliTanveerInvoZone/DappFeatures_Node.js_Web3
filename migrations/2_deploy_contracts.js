const UniqueAssets = artifacts.require("UniqueAsset");
const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {
  deployer.deploy(UniqueAssets);
  await deployer.deploy(Token);
  const token = await Token.deployed();
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();
  await deployer.deploy(TokenFarm, token.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  await token.transfer(ethSwap.address, "1000000000000000000000000");
  await daiToken.transfer(accounts[1], "100000000000000000000");
  await token.transfer(tokenFarm.address, "1000000000000000000000000");
};
