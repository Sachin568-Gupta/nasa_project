const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const app = express();
const planetRouter = require("./routes/planets.route");
const launchRouter = require("./routes/launches.route");
app.use(morgan('dev'));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(planetRouter);
app.use(launchRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})
module.exports = app;
