const express = require("express");
const HomeRoute = require("./routes/Home.route");

const app = express();

app.use(express.json());
app.use("/api", HomeRoute);

const PORT = 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
