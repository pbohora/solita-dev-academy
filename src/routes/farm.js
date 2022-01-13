const farmRouter = require("express").Router();
const { body, validationResult } = require("express-validator");

const Farm = require("../models/farm");

farmRouter.get("/", async (req, res) => {
  try {
    const farms = await Farm.find({});
    res.status(200).json(farms.map((farm) => farm.toSimpleJSON()));
  } catch (exception) {
    next(exception);
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

farmRouter.post(
  "/create",
  body("name").isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "invalid farm name" });
    }
    try {
      const farm = new Farm({ name: req.body.name });
      const savedFarm = await farm.save();
      res.status(201).json(savedFarm.toSimpleJSON());
    } catch (exception) {
      next(exception);
    }
  }
);

module.exports = farmRouter;
