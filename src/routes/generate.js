const { Router } = require("express");
const router = new Router();

const _ = require("../common/imports");
const fu = require("../common/utils");
const jsonify = require("../common/jsonify");

router.get("/", res => {
  const data = {
    name: "GENERATE",
    website: "inycom.es"
  };

  res.json(data);
});

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const document = req.files.document;
  const format = req.body.format;
  const formats = ["base64", "hash"];

  if (
    fu.getFileExtension(document.name).localeCompare("pdf") == 0 &&
    formats.includes(format)
  ) {
    const path = "./uploads/" + document.name;
    _.fs.writeFileSync(path, document.data); // pdf-to-base64 only supports absolute URLs

    _.pdf(document.data).then(data => {
      switch (format) {
        case "base64":
          _.pdf2base64(path).then(docBase64 => {
            let json = new jsonify.Json64(
              docBase64,
              data.numpages,
              data.info,
              data.version
            );
            res.contentType("application/json");
            res.send(JSON.stringify(json));
          });
          break;
        case "hash":
          let json = new jsonify.Json(
            _.hash.digest(data.text),
            data.numpages,
            data.info,
            data.version
          );
          res.contentType("application/json");
          res.send(JSON.stringify(json));
          break;
      }

      _.fs.unlinkSync(path);
    });
  } else {
    try {
      res.send({
        success: false,
        message:
          "Wrong file extension (must be PDF), or, wrong export format (base64, hash)"
      });
      throw new Error(
        "Wrong file extension (must be PDF), or, wrong export format (base64, hash)."
      );
    } catch (e) {
      console.log(e.name + ": " + e.message);
    }
  }
});

module.exports = router;
