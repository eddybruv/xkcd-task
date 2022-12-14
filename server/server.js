const express = require("express");
const HomeRoute = require("./routes/Home.route");
require("dotenv").config();
const path = require("path");
const connectDB = require("./db/db");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use("/api", HomeRoute);

app.use(express.static(path.join(__dirname, "../", "client", "build")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
