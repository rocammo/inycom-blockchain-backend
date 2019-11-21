const { Router } = require("express");
const router = new Router();

const _ = require("../common/imports");
const fu = require("../common/utils");

router.get("/", res => {
  const data = {
    name: "CHECKSUM",
    website: "inycom.es"
  };

  res.json(data);
});

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const document = req.files.document;

  if (fu.getFileExtension(document.name).localeCompare("json") == 0) {
    const path = "./uploads/" + document.name;
    _.fs.writeFileSync(path, document.data);
    res.send(_.hash.digest(JSON.parse(_.fs.readFileSync(path))));
    _.fs.unlinkSync(path);
  } else {
    try {
      res.send({
        success: false,
        message: "Wrong file extension (must be JSON)"
      });
      throw new Error("Wrong file extension (must be JSON).");
    } catch (e) {
      console.log(e.name + ": " + e.message);
    }
  }
});

module.exports = router;
