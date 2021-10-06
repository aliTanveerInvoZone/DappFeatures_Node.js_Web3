// const { create } = require("ipfs-http-client");
// const IPFSClient = create();
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK("08ec77866c7cb71db217", "9a77b8797d14dc2b80e1fd312ba0962211444c47cad9749d8b5b91971fc46b0f");

pinata
  .testAuthentication()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports.uploadFile = async function (stream) {
  try {
    return await pinata.pinFileToIPFS(stream);
  } catch (error) {
    return error;
  }
};
