const axios = require("axios");

const HomeController = async (_req, res) => {
  const results = await axios.get("https://xkcd.com/info.0.json");
  console.log("data", results.data);

  res.status(200).json(results.data);
};

const SpecificController = async (req, res) => {
  const id = req.params.id;
  const results = await axios.get(`https://xkcd.com/${id}/info.0.json`);

  res.status(200).json(results.data);
};

module.exports = { HomeController, SpecificController };
