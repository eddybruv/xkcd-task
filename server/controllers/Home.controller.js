const axios = require("axios");
const CountSchemaModel = require("../models/PageCount.model");
let lastPage = 0;

const HomeController = async (_req, res) => {
  const { data } = await axios.get("https://xkcd.com/info.0.json");
  lastPage = data.num;
  const strip = await CountSchemaModel.find({ stripNumber: data.num });

  if (strip.length === 0) {
    const newStrip = await CountSchemaModel.create({
      stripNumber: data.num,
      count: 1,
    });

    return res
      .status(200)
      .json({ ...data, count: newStrip.count, lastNum: data.num });
  } else {
    const newCount = strip[0].count + 1;
    const updatedStrip = await CountSchemaModel.findOneAndUpdate(
      { stripNumber: data.num },
      { count: newCount },
      { new: true }
    );

    return res
      .status(200)
      .json({ ...data, count: updatedStrip.count, lastNum: data.num });
  }
};

const SpecificController = async (req, res) => {
  const id = req.params.id;


  if (id === "NaN" || Number(id) > lastPage || Number(id) <= 0) {
    return res.status(400).json({ message: "page not found" });
  }

  const { data } = await axios.get(`https://xkcd.com/${id}/info.0.json`);

  const strip = await CountSchemaModel.find({ stripNumber: data.num });

  if (strip.length === 0) {
    const newStrip = await CountSchemaModel.create({
      stripNumber: data.num,
      count: 1,
    });

    return res.status(200).json({ ...data, count: newStrip.count });
  } else {
    const newCount = strip[0].count + 1;
    const updatedStrip = await CountSchemaModel.findOneAndUpdate(
      { stripNumber: data.num },
      { count: newCount },
      { new: true }
    );

    return res.status(200).json({ ...data, count: updatedStrip.count });
  }
};

module.exports = { HomeController, SpecificController };
