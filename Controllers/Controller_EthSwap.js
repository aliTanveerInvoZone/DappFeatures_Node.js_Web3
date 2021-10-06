const Controller = {};
let _EthSwapModel;
let _web3;

Controller.InitModel = function (model) {
  const { EthSwapModel, web3 } = model;
  _EthSwapModel = EthSwapModel;
  _web3 = web3;
};

function formateValueToWei(value) {
  value = _web3.utils.toWei(value.toString());
  return value;
}
function formateValueFromWei(value) {
  value = _web3.utils.fromWei(value, "Ether");
  return value;
}

Controller.buyTokens = function (req, res) {
  if (req.fields.value && req.fields.accountAddress) {
    let value = formateValueToWei(req.fields.value);
    _EthSwapModel.buyTokens(value, req.fields.accountAddress).then((response) => {
      if (response.success && res.statusCode === 200) {
        res.send(createResponseBody(res.statusCode, response.data, response.message));
      } else {
        res.status(500).send(createResponseBody(res.statusCode, null, response.message));
      }
    });
  }
};

Controller.sellTokens = function (req, res) {
  if (req.fields.value && req.fields.accountAddress) {
    let value = formateValueToWei(req.fields.value);
    _EthSwapModel.sellTokens(value, req.fields.accountAddress).then((resp) => {
      if (res.statusCode === 200 && resp.success) {
        return res.send(createResponseBody(res.statusCode, resp, "Success"));
      } else {
        return res.status(500).json({ status: 500, message: resp.message });
      }
    });
  } else {
    res.status(500).send(createResponseBody(res.statusCode, null, "Missing Parameters"));
  }
};

Controller.getTokenBalance = function (req, res) {
  if (req.params.accountAddress) {
    _EthSwapModel.getTokenBalance(req.params.accountAddress).then((resp) => {
      if (resp.success) {
        let value = formateValueFromWei(resp.data);
        return res.send(createResponseBody(res.statusCode, value + " Tokens", "Success"));
      } else {
        return res.status(500).json({ status: 500, message: resp.message });
      }
    });
  } else {
    res.status(500).send(createResponseBody(res.statusCode, null, "Missing Parameters"));
  }
};

function createResponseBody(statusCode, body, message) {
  console.log("EthSwap Controller  Response ==> ", { statusCode, body, message });
  return { statusCode, body, message };
}

module.exports = Controller;
