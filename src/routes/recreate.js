const { Router } = require("express");
const router = new Router();

const _ = require("../common/imports");
const fu = require("../common/utils");

router.get("/", res => {
  const data = {
    name: "RECREATE",
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
    let json = JSON.parse(document.data);

    if (json.hasOwnProperty("base64")) {
      _.fs.writeFileSync(
        "./uploads/" + fu.getFileName(document.name) + ".pdf",
        json["base64"],
        "base64"
      );

      let docPDF = _.fs.readFileSync(
        "./uploads/" + fu.getFileName(document.name) + ".pdf"
      );
      res.contentType("application/pdf");
      res.send(docPDF);

      _.fs.unlinkSync("./uploads/" + fu.getFileName(document.name) + ".pdf");
    } else {
      try {
        res.send({
          success: false,
          message:
            "PDF document cannot be reconstructed. Not found base64 property"
        });
        throw new Error(
          "PDF document cannot be reconstructed. Not found base64 property."
        );
      } catch (e) {
        console.log(e.name + ": " + e.message);
      }
    }
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
