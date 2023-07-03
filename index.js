require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routes/items");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/items", itemsRouter);
// app.use("/", (req, res) => {
//   res.send("welcome to the server");
// });

app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
