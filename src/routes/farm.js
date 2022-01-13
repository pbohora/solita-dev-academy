const farmRouter = require("express").Router();
const { body, validationResult } = require("express-validator");

const Farm = require("../models/farm");

farmRouter.get("/", async (req, res) => {
  try {
    const farms = await Farm.find({});
    res.status(200).json(farms.map((farm) => farm.toSimpleJSON()));
  } catch (error) {
    res.status(400).json({ error: "error at router " + error });
  }
});

farmRouter.get("/:farmId", async (req, res, next) => {
  try {
    const { farmId } = req.params;
    const farm = await Farm.findById(farmId);

    res.status(200).json(farm.toSimpleJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = farmRouter;
