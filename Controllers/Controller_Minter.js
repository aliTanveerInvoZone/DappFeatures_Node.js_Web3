const Controller = {};
let Model;

Controller.InitModel = function (model) {
  Model = model;
};

Controller.mintNFT = function (req, res) {
  console.log("file", req.files.file);
  if (req.files.file && req.fields.accountAddress) {
    let file = req.files.file;
    let stream = require("fs").createReadStream(file.path);
    Model.IPFSModel.uploadFile(stream).then(async (response) => {
      if (response.IpfsHash) {
        try {
          let minter = await Model.MinterModel.mintNFT(response.IpfsHash, req.fields.accountAddress);
          console.log("minter", minter);
          if (minter?.success) {
            res.send(createResponseBody(res.statusCode, minter, ""));
          } else {
            res.status(500).send(createResponseBody(res.statusCode, null, minter?.message));
          }
        } catch (e) {
          res.status(500).send(createResponseBody(res.statusCode, null, e.message));
        }
      } else {
        res.status(500).send(createResponseBody(res.statusCode, null, "Issue with IPFS upload"));
      }
    });
  } else {
    res.status(400).send(createResponseBody(res.statusCode, null, "parameters are missing"));
  }
};

Controller.getNFTs = function (req, res) {
  try {
    Model.MinterModel.getNFTs().then((resp) => {
      if (res.statusCode === 200 && resp.success) {
        return res.send(createResponseBody(res.statusCode, resp, "Success"));
      } else {
        return res.status(500).json({ status: 500, message: resp.message });
      }
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

function createResponseBody(statusCode, body, message) {
  console.log("Minter Controller Current Response ===> ", { statusCode, body, message });
  return { statusCode, body, message };
}

module.exports = Controller;
