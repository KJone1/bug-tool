const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
////////////////
server.use(cors());

server.use(express.json());
///////////////
const PORT = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;
///////////////////////
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("-- MongoDB database connection established successfully --");
});
////////////////
const bugRouter = require("./routes/bugsRoute");
server.use("/bugs", bugRouter);

server.listen(PORT, function () {
  console.log(`-- Server is running on Port: ${PORT} -- `);
});
