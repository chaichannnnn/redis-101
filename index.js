require("dotenv").config();
const routes = require("./routes/routes");
const express = require("express");
const database = require("./connection/mongo");
const port = process.env.PORT;

//Express
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
