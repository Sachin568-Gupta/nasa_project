const http = require("http");
const mongoose = require("mongoose");
require('dotenv').config();
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const Mongo_Url = process.env.MONGO_URL;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Database connection Ready!!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function startServer() {
  mongoose.connect(Mongo_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await loadPlanetData();

  server.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
}

startServer();
