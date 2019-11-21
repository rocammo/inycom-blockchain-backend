var express = require("express");
const app = express();
var fileupload = require("express-fileupload");
app.use(fileupload());

app.get("/", (req, res, next) => {
  res.status(200).send("Hello, world!");
});

app.post("/upload", function(req, res, next) {
  const file = req.files.document;
  file.mv("./uploads/" + file.name, function(err, result) {
    if (err) {
      throw err;
    }

    res.send({
      success: true,
      message: "File uploaded!"
    });
  });
});

app.listen(3000, () => {
  console.log("Started on port: 3000");
});
