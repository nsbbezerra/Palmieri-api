require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use("/img", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, function () {
  console.log("Servidor Ativo na Porta", port);
});
