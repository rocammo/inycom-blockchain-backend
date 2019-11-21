const { Router } = require("express");
const router = new Router();

const { decodeConstructorArgs } = require("canoe-solidity");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/e331bea5880b4521b66098e91fea72bb"
  )
);
const ABI = [
  {
    anonymous: false,
    inputs: [{ name: "_hash", type: "string" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];

const _ = require("../common/imports");
const fu = require("../common/utils");

router.get("/", res => {
  const data = {
    name: "VALIDATE",
    website: "inycom.es"
  };

  res.json(data);
});

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("No url were specified.");
  }

  const document = req.files.document;
  const url = req.body.url;

  if (
    fu.getFileExtension(document.name).localeCompare("json") == 0 &&
    url.includes("https://rinkeby.etherscan.io/tx/")
  ) {
    let jsonHash = _.hash.digest(document.data);
    let txHash = url.replace("https://rinkeby.etherscan.io/tx/", "");

    web3.eth.getTransaction(txHash).then(txn => {
      let _hash = decodeConstructorArgs(ABI, txn.input.substring(10))[0].data;

      if (_hash == jsonHash) {
        res.send({
          success: true,
          message: "ASSERT EQUALS !",
          assert: true
        });
      } else {
        res.send({
          success: true,
          message: "ASSERT NOT EQUALS !",
          assert: false
        });
      }
    });
  } else {
    try {
      res.send({
        success: false,
        message: "Wrong file extension (must be JSON), or, wrong URL format"
      });
      throw new Error(
        "Wrong file extension (must be JSON), or, wrong URL format."
      );
    } catch (e) {
      console.log(e.name + ": " + e.message);
    }
  }
});

module.exports = router;
