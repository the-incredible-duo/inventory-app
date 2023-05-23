const express = require("express");
const router = express.Router();
const { Sauce } = require("../models");

// GET /sauce
router.get("/", async (req, res, next) => {
  try {
    const sauces = await Sauce.findAll();
    res.send(sauces);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const{ name, image } = req.body;

  try {
    const sauce = await Sauce.findByPk(id);

    if (!sauce) {
      res.status(404).send("Item not found");
    } else {
      await sauce.update({name, image});    // Update sauce with name and image values
      res,send(sauce);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
