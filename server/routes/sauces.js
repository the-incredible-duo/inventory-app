const express = require("express");
const router = express.Router();
const { Sauce } = require("../models");

// GET /sauce
router.get("/", async (req, res, next) => {
  try {
    const sauces = await Sauce.findAll();   // Searches all of Sauce
    res.send(sauces);
  } catch (error) {
    next(error);  // next allows the UI to be retrieved from the server
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;  // Contains the properties mapped to id
  const{ name, image } = req.body;    // Allows access of data from the client side

  try {
    const sauce = await Sauce.findByPk(id);   // Finds the item through the given id

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
