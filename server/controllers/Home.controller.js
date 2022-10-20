const axios = require("axios");
let lastPage = 0;

const HomeController = async (_req, res) => {
  const results = await axios.get("https://xkcd.com/info.0.json");
  lastPage = results.data.num;
  res.status(200).json(results.data);
};

const SpecificController = async (req, res) => {
  const id = req.params.id;


  if (id === "NaN" || Number(id) > lastPage || Number(id) <= 0) {
    return res.status(400).json({ message: "page not found" });
  }

  const results = await axios.get(`https://xkcd.com/${id}/info.0.json`);

  res.status(200).json(results.data);
};

module.exports = { HomeController, SpecificController };
