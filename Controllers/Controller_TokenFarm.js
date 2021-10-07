const Controller = {};
let _TokenFarmModel;
let _web3;

Controller.InitModel = function (model) {
  const { TokenFarmModel, web3 } = model;
  _TokenFarmModel = TokenFarmModel;
  _web3 = web3;
};

function formateValueToWei(value) {
  value = _web3.utils.toWei(value.toString());
  return value;
}
function formateValueFromWei(value) {
  value = _web3.utils.fromWei(value.toString(), "Ether");
  return value;
}

Controller.getDaiTokenBalance = function (req, res) {
  if (req.params.accountAddress) {
    _TokenFarmModel.getDaiTokenBalance(req.params.accountAddress).then((resp) => {
      if (resp.success) {
        let value = parseFloat(formateValueFromWei(resp.data)).toFixed(2);
        res.send(createResponseBody(res.statusCode, value, "Dai Token Balance"));
      } else {
        res.status(500).send(createResponseBody(res.statusCode, null, resp.message));
      }
    });
  } else {
    res.status(500).send(createResponseBody(res.statusCode, null, "Missing Parameters are required"));
  }
};

Controller.getTokenFarmBalance = function (req, res) {
  if (req.params.accountAddress) {
    _TokenFarmModel.getTokenFarmBalance(req.params.accountAddress).then((resp) => {
      if (resp.success) {
        let value = parseFloat(formateValueFromWei(resp.data)).toFixed(2);
        res.send(createResponseBody(res.statusCode, value, "Token Farm Balance"));
      } else {
        res.status(500).send(createResponseBody(res.statusCode, null, resp.message));
      }
    });
  } else {
    res.status(500).send(createResponseBody(res.statusCode, null, "Missing Parameters are required"));
  }
};

Controller.stakeTokens = function (req, res) {
  if (req.fields.accountAddress && req.fields.value) {
    let value = formateValueToWei(req.fields.value);
    _TokenFarmModel.stakeTokens(value, req.fields.accountAddress).then((resp) => {
      if (resp.success) {
        res.send(createResponseBody(res.statusCode, resp, "Dai Token Balance"));
      } else {
        res.status(500).send(createResponseBody(res.statusCode, null, resp.message));
      }
    });
  } else {
    res.status(500).send(createResponseBody(res.statusCode, null, "Missing Parameters are required"));
  }
};

Controller.unStakeTokens = function (req, res) {
  if (req.fields.accountAddress) {
    _TokenFarmModel.unStakeTokens(req.fields.accountAddress).then((resp) => {
      if (resp.success) {
        res.send(createResponseBody(res.statusCode, resp, "Dai Token Balance"));
      } else {
        res.status(500).send(createResponseBody(res.statusCode, null, resp.message));
      }
    });
  } else {
    res.status(500).send(createResponseBody(res.statusCode, null, "Missing Parameters are required"));
  }
};

Controller.getTokenBalance = function (req, res) {
  try {
    _TokenFarmModel.getTokenBalance(req.params.accountAddress, (resp) => {
      console.log("resp", resp);
      if (resp.success) {
        let value = formateValueFromWei(resp.data);
        return res.send(createResponseBody(res.statusCode, value + " Tokens", "Success"));
      } else {
        return res.status(500).json({ status: 500, message: resp.message });
      }
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

function createResponseBody(statusCode, body, message) {
  console.log("EthSwap Controller  Response ==> ", { statusCode, body, message });
  return { statusCode, body, message };
}
module.exports = Controller;
