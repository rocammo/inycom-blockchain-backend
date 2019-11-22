const express = require("express");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(fileupload());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/generate", require("./routes/generate"));
app.use("/api/recreate", require("./routes/recreate"));
app.use("/api/validate", require("./routes/validate"));
app.use("/api/checksum", require("./routes/checksum"));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
