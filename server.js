require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const router = require("./Routes/index");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(formidable());
  app.use(router);
});
