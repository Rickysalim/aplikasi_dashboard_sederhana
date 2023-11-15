const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const formData = require("express-form-data");
const os = require('os')

const db = require("./models");

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const formDataOption = {
  uploadDir: os.tmpdir(),
  autoClean: true
}


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOption));
app.use(formData.parse(formDataOption))
app.use(formData.format())
app.use(formData.stream())
app.use(formData.union())


require("./routes/index")(app);

const port = process.env.PORT || "5000";

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.info(`running on port:${port}`);
  });
});
