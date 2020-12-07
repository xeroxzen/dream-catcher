const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mngoose database connection established successfully");
});

const dreamsRoute = require("./routes/dreams");
const dreamersRoute = require("./routes/users");

app.use("./dreams", dreamsRoute);
app.use("./dreamers", dreamersRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
