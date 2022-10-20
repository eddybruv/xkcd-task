const {
  HomeController,
  SpecificController,
} = require("../controllers/Home.controller");
const express = require("express");
const router = express.Router();

router.route("/").get(HomeController);
router.route("/:id").get(SpecificController);

module.exports = router;
